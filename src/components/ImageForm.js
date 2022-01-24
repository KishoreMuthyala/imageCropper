import React, { useContext, useRef } from "react";


import ImageContext from "../context/imageContext";

const ImageForm = () => {
   
    const inputRef = useRef(null);

    const imageContext = useContext(ImageContext);

    const { uploadImage } = imageContext;

    const clickHandler = (e) => {
        e.preventDefault();

        uploadImage(inputRef.current.files);
       
    };
    return (
        <form className="text-center pt-5 pb-5" onSubmit={clickHandler}>
            <div className="mb-3">
                <input
                    className="form-control m-auto"
                    accept="image/*"
                    ref={inputRef}
                    type="file"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Upload
            </button>
        </form>
    );
};

export default ImageForm;
