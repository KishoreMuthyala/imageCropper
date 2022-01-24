import React, { useState } from "react";
import ImageContext from "./imageContext";
import axios from "axios";

const ImageState = (props) => {
    const initialState = {
        images: [],
        currentImage: null,
        croppedImage: null,
        dimensions: null,
        file: "",
        err: null,
        loading: false,
    };

    const [state, setState] = useState(initialState);

    const getImages = async () => {
        setState({ ...state, loading: true });

        try {
            let res = await axios.get(
                "https://61ec05367ec58900177cde3b.mockapi.io/images"
            );
            setState({ ...state, images: res.data, loading: false });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteImage = async (id) => {
        try {
            let res = axios.delete(
                `https://61ec05367ec58900177cde3b.mockapi.io/images/${id}`
            );
            setState({
                ...state,
                images: state.images.filter((img) => img.id !== id),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const uploadImage = (file) => {
        console.log(file[0]);
        if (!file[0]) {
            setState({ ...state, err: "Please Choose the Image" });
            return;
        } else {
            setState({ ...state, err: "", loading: true });
        }
        try {
            const data = new FormData();
            data.append("file", file[0]);
            data.append("upload_preset", "image_resizer");
            data.append("cloud_name", "duzmkp8rd");
            fetch("https://api.cloudinary.com/v1_1/duzmkp8rd/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then(async (data) => {
                    //setUrl(data.url);
                    let re = await axios.post(
                        "https://61ec05367ec58900177cde3b.mockapi.io/images",
                        { url: data.url, alt: file[0].name },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    setState({
                        ...state,
                        images: [...state.images, re.data],
                        loading: false,
                        err: "",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }

        //     let reader = new FileReader();
        //     reader.readAsDataURL(file[0]);
        //     reader.onload = async () => {
        //         //console.log(file);
        //         if (reader.readyState === 2) {
        //
        //         }
        //     };
        //
    };
    const setFile = (val) => {
        setState({ ...state, file: val });
    };

    const setCurrent = (val) => {
        setState({ ...state, currentImage: val, croppedImage: val });
    };
    const setCroppedImage = (val) => {
        setState({ ...state, croppedImage: val, dimensions: null });
    };

    const setDimensions = (width, height) => {
        setState({
            ...state,
            dimensions: {
                width,
                height,
            },
        });
    };

    return (
        <ImageContext.Provider
            value={{
                images: state.images,
                currentImage: state.currentImage,
                croppedImage: state.croppedImage,
                loading: state.loading,
                dimensions: state.dimensions,
                file: state.file,
                err: state.err,
                setCurrent,
                deleteImage,
                getImages,
                uploadImage,
                setCroppedImage,
                setDimensions,
                setFile,
            }}
        >
            {props.children}
        </ImageContext.Provider>
    );
};

export default ImageState;
