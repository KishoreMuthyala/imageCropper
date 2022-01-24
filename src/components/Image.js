import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ImageContext from "../context/imageContext";

const Image = ({ image }) => {
    const { setCurrent, deleteImage, setCroppedImage } =
        useContext(ImageContext);

    const Preview = () => {
        setCurrent(image);
    };

    const crop = () => {
        setCroppedImage(image);
    };
    return (
        <div className="card pe-3 ps-3 pt-4 pb-4">
            <div className="img mb-3">
                <img className="image me-5" src={image.url} alt={image.alt} />
                <i
                    className="fas fa-trash delete-icon"
                    onClick={() => deleteImage(image.id)}
                ></i>
            </div>
            <div className="prop">
                <Link
                    to="/preview"
                    className="btn btn-secondary"
                    onClick={Preview}
                >
                    Preview
                </Link>
                <Link
                    to="/crop"
                    className="btn btn-secondary ms-2"
                    onClick={crop}
                >
                    Crop
                </Link>
            </div>
        </div>
    );
};

export default Image;
