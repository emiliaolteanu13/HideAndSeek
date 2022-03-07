import axios from 'axios';
import React, { useState } from 'react'; 
export default function FileUpload() { 

    const [state, setState] = useState({selectedFile: null}); 
 
    const onFileChange = event => { 
      setState({ selectedFile: event.target.files[0] }); 
    }; 
     
    const onFileUpload = () => { 
      const formData = new FormData(); 
     
      formData.append( 
        "myFile", 
        state.selectedFile, 
        state.selectedFile.name 
      ); 
     
      console.log(state.selectedFile); 
     
      axios.post("api/uploadfile", formData); 
    }; 
     
 
    const fileData = () => { 
      if (state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {state.selectedFile.name}</p> 
            <p>File Type: {state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
    }; 
     
      return ( 
        <div> 
            <div> 
                <input type="file" onChange={onFileChange} /> 
                <button onClick={onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
          {fileData()} 
        </div> 
      ); 
    
  } 
  