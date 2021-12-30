import React from "react";
import './FileInput.css';
import {UploadIcon} from "evergreen-ui";

function FileInput() {
    return <div className="file-container">
        <input type='file' className="file-input"/>
        <div className="placeholder-center">
            <UploadIcon size={36}></UploadIcon>
            <h3>Upload new dog image</h3>
        </div>

    </div>
}

export default FileInput;