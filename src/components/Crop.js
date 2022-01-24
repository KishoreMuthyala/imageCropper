import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import ImageContext from "../context/imageContext";

const Crop = () => {
    const navigate = useNavigate();
    const imageContext = useContext(ImageContext);
    const { croppedImage, setDimensions } =
        imageContext;
    useEffect(() => {
        if (!croppedImage) {
            navigate("/");
        }
    }, [croppedImage]);

    const mainCropperRef = useRef(null);
    // const imgRef = useRef(null);
    const imageRef = useRef(null);
    const croppedImageContainerRef = useRef(null);
    const mainContainerRef = useRef(null);
    const CanvasRef = useRef(null);

    

    const cropper1 = (e, width_direction, height_direction) => {
        let prevX = e.clientX;
        let prevY = e.clientY;
        let width;
        let height, left, top;
        width = mainCropperRef.current.offsetWidth;
        left = mainCropperRef.current.offsetLeft;
        height = mainCropperRef.current.offsetHeight;
        top = mainCropperRef.current.offsetTop;
        window.addEventListener("mousemove", mousemove);
        mainCropperRef.current.addEventListener("mousemove", mousemove);

        window.addEventListener("mouseup", mouseup);
        mainCropperRef.current.addEventListener("mouseup", mouseup);

        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            mainCropperRef.current.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            mainCropperRef.current.removeEventListener("mouseup", mouseup);
        }

        function mousemove(e) {
            if (mainCropperRef.current.offsetWidth > 49) {
                if (width_direction === "right") {
                    let w = width + (e.clientX - prevX);
                    if (w > 50) mainCropperRef.current.style.width = w + "px";
                } else {
                    let l = left + (e.clientX - prevX);
                    if (l >= 0) mainCropperRef.current.style.left = l + "px";
                    let w = width - (e.clientX - prevX);
                    if (w > 50) mainCropperRef.current.style.width = w + "px";
                }
            }
            if (mainCropperRef.current.offsetHeight > 49) {
                if (height_direction === "bottom") {
                    let h = height + (e.clientY - prevY);
                    if (h >= 50) mainCropperRef.current.style.height = h + "px";
                } else {
                    if (width_direction === "right") {
                        let t = top - (e.clientX - prevX);
                        if (t >= 0) mainCropperRef.current.style.top = t + "px";
                        let h = height + (e.clientX - prevX);
                        if (h > 50)
                            mainCropperRef.current.style.height = h + "px";
                    } else {
                        let t = top + (e.clientY - prevY);
                        if (t >= 0) mainCropperRef.current.style.top = t + "px";
                        let h = height - (e.clientX - prevX);
                        if (h > 50)
                            mainCropperRef.current.style.height = h + "px";
                    }
                }
            }
        }
    };

    const downloadHandler = () => {
        let anchorElement = document.createElement("a");
        cropHandler();
        anchorElement.href = CanvasRef.current
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        anchorElement.download = `${croppedImage.alt}-cropped.png`;

        document.body.appendChild(anchorElement);
        anchorElement.click();
        setTimeout(function () {
            document.body.removeChild(anchorElement);
        });
    };

    const cropHandler = () => {
        let canvas = CanvasRef.current;

        CanvasRef.current.width = imageRef.current.width;
        CanvasRef.current.height = imageRef.current.height;

        let ctx = canvas.getContext("2d");
        let offsetWidth = mainCropperRef.current.offsetWidth;
        ctx.drawImage(
            imageRef.current,
            mainCropperRef.current.offsetLeft,
            mainCropperRef.current.offsetTop,
            offsetWidth,
            mainCropperRef.current.offsetHeight,
            0,
            0,
            offsetWidth,
            mainCropperRef.current.offsetHeight
        );
        setDimensions(
            mainCropperRef.current.offsetWidth,
            mainCropperRef.current.offsetHeight
        );

        imageRef.current.style.display = "none";
        imageRef.current.alt = "";
        mainCropperRef.current.style.display = "none";
    };

    return (
        <div className="crop-image-container">
            <div
                style={{
                    textAlign: "center",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div>
                    <button
                        className="btn btn-success"
                        onClick={cropHandler}
                        style={{
                            marginRight: "20px",

                            zIndex: "1100",
                        }}
                    >
                        Preview of the cropped Image
                    </button>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={downloadHandler}
                        style={{
                            marginRight: "20px",

                            zIndex: "1100",
                        }}
                    >
                        Download Image
                    </button>
                </div>
                <div>
                    <button
                        className="btn btn-secondary"
                        style={{
                            marginRight: "20px",
                            zIndex: "1100",
                        }}
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </button>
                </div>
            </div>

            {croppedImage && (
                <div className="crop-image" ref={mainContainerRef}>
                    <div
                        ref={croppedImageContainerRef}
                        style={{
                            position: "relative",
                            width: "fit-content",
                        }}
                    >
                        <img
                            src={croppedImage.url}
                            alt={croppedImage.alt}
                            ref={imageRef}
                            className="crop-img"
                        />
                        <div className="cropper" ref={mainCropperRef}>
                            <div
                                onMouseDown={(e) =>
                                    cropper1(e, "right", "bottom")
                                }
                                className="bottom-right"
                            ></div>
                            <div
                                onMouseDown={(e) => cropper1(e, "right", "top")}
                                className="top-right"
                            ></div>
                            <div
                                onMouseDown={(e) =>
                                    cropper1(e, "left", "bottom")
                                }
                                className="bottom-left"
                            ></div>
                            <div
                                onMouseDown={(e) => cropper1(e, "left", "top")}
                                className="top-left"
                            ></div>
                        </div>
                    </div>

                    <canvas className="mt-3" ref={CanvasRef}>
                        Doesn't support Canvas
                    </canvas>
                </div>
            )}
        </div>
    );
};

export default Crop;
