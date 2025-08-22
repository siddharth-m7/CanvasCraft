import DropZone from "../Components/Editor/DropZone";
import Navbar from "../Components/Navbar";
import React, { useState } from "react";
import ImageCanvas from "../Components/Editor/ImageCanvas";


export default function Editor() {

    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const handleFileDrop = (file) => {
        // setPreview(URL.createObjectURL(file));
        setImageFile(file);
        // later you can send file to editor, backend, etc.
    };

    return (
        <>
        <Navbar/>
        <div className="editor-container">
        <h1>Editor Page</h1>
        <div className="flex flex-col items-center gap-6 p-10">
            {!imageFile && (<DropZone onDropFile={handleFileDrop} />)}
        </div>
            {imageFile && (<ImageCanvas imageFile={imageFile} />)}
        </div>
        </>
    );
    }  