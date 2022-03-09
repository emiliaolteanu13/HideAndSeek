import axios from 'axios';
import React, { useState } from 'react'; 
import { Container, Form, Header, Segment } from 'semantic-ui-react';


export default function FileUpload() { 

    const [state, setState] = useState({selectedFile: null});
    const [key, setKey] = useState('');
    const [operation, setOperation] = useState('');
    
    const onChangeKey = (event) => {
        setKey(event.target.value);
    }
    const onFileChange = (event) => { 
      setState({ selectedFile: event.target.files[0] });
    };
    const onChangeOperation = (event) => {
        setOperation(event.target.innerText);
    }
    
    const onFileUpload = async (event) => {
      const formData = new FormData();
    
      formData.append( 
        "file",
        state.selectedFile, 
        state.selectedFile.name 
      );
      formData.append(
          "key",
          key
      )
      formData.append(
          "operation",
          operation
      )
      try{
          const res = await axios({method:"POST", url:"https://localhost:7277/api/file", 
          data: formData,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
          console.log(res);
      }
      catch(ex) {
          console.log(ex);
      }
       
    };
    
    const fileData = () => { 
      if (state.selectedFile) { 
          
        return ( 
          <Container> 
            <Header>File Details:</Header> 
            <p>File Name: {state.selectedFile.name}</p> 
            <p>File Type: {state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </Container> 
        ); 
      } else { 
        return ( 
          <Container> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </Container> 
        ); 
      } 
    }; 
     
      return ( 
        <Container> 
            <Segment>
                <Form>
                    <Form.Input fluid type='file' onChange={onFileChange}/>
                    <Form.Input label='Key' value={key} onChange={onChangeKey} />
                    <Form.Group>
                        <label>Encrypt or Decrypt?</label>
                            <Form.Radio label='encrypt' operation='encrypt' checked={operation === 'encrypt'} onChange={onChangeOperation} />
                      
                            <Form.Radio label='decrypt' operation='decrypt' checked={operation === 'decrypt'} onChange={onChangeOperation} />   
            
                    </Form.Group>
                    <Form.Button onClick={onFileUpload}>Upload</Form.Button>
                </Form>
                {/* <input className="ui icon button" type="file" onChange={onFileChange} /> */}
                
                {/* <Button primary onClick={onFileUpload}> 
                  Upload! 
                </Button>  */}
            </Segment> 
          {fileData()} 
        </Container> 
      ); 
    
  } 
  