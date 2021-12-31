import React from "react";
import './FileInput.css';
import { FilePicker } from "evergreen-ui";

interface Props {
    handleFileChanged: (file: File) => void
}

function FileInput({ handleFileChanged }: Props) {
    return <div>
        <FilePicker
            onChange={files => files.length ? handleFileChanged(files[0]) : null}
            placeholder="Select the file here!"
        />

    </div>
}

export default FileInput;