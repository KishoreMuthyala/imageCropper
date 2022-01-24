import "./App.css";

import Crop from "./components/Crop";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ImageState from "./context/ImageState";
import Home from "./components/Home";
import Preview from "./components/Preview";

function App() {
    return (
        <ImageState>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/crop" element={<Crop />} />
                </Routes>
            </BrowserRouter>
        </ImageState>
    );
}

export default App;
