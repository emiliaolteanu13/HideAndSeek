import React from "react";
import { Button } from "semantic-ui-react";



export default function FileDownload(){
    const file = () => {
        window.open("https://localhost:7277/api/file/download", '_blank');
    }
    return(
        <Button onClick={file}>Download</Button>
    )
}