import React, { useContext } from "react";
import ImageContext from "../context/imageContext";
import ImageForm from "./ImageForm";
import Images from "./Images";

const Home = () => {
    const imageContext = useContext(ImageContext);
    const { err } = imageContext;
    console.log(err);
    return (
        <div className="container">
            <ImageForm />
            {err && <p className="text-danger text-center">{err}</p>}
            <Images />
        </div>
    );
};

export default Home;
