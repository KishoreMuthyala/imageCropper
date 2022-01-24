import React, { useContext, useEffect } from "react";
import ImageContext from "../context/imageContext";
import Image from "./Image";

const Images = () => {
    const imageContext = useContext(ImageContext);
    const { images, getImages, loading } = imageContext;

    useEffect(() => {
        getImages();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="images-container">
            {loading
                ? "Loading..."
                : images.length === 0
                ? "No Images"
                : images.map((img) => <Image key={img.id} image={img} />)}
        </div>
    );
};

export default Images;
