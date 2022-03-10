import axios from "axios";
import React from "react";
import { Button } from "semantic-ui-react";



export default function FileDownload(){
    const file = () => {
        window.open("https://localhost:7277/api/file/download", '_blank');
        //axios.get("https://localhost:7277/api/file/download");
    }
    return(
        <Button onClick={file}>Download</Button>
    )
}