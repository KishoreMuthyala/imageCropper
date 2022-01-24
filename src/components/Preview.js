import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ImageContext from "../context/imageContext";

const Preview = () => {
    const imageContext = useContext(ImageContext);
    const navigate = useNavigate();

    const { currentImage } = imageContext;
    useEffect(() => {
        if (!currentImage) {
            navigate("/");
        }
    }, [currentImage]);

    return (
        <div className="current-image">
            <div className="text-center p-3">
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
            {currentImage && (
                <div className="current-img">
                    <img
                        src={currentImage.url}
                        alt={currentImage.alt}
                        className="current-img"
                    />
                </div>
            )}
        </div>
    );
};

export default Preview;
