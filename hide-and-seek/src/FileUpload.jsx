import axios from 'axios';
import React, { useState } from 'react'; 
import { Button, Card, Container, Form, Header, Icon, Progress, Segment } from 'semantic-ui-react';
import FileDownload from './FileDownload';


export default function FileUpload() { 

    const [state, setState] = useState({selectedFile: null});
    const [key, setKey] = useState('');
    const [flag, setFlag] = useState(false);
    const [operation, setOperation] = useState('');
    const [statusCode, setStatusCode] = useState('');
    
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
          await axios({method:"POST", url:"https://localhost:7277/api/file", 
          data: formData,
          headers: { "Access-Control-Allow-Origin": "*" }
          
        }).then(response => {
          setStatusCode(response.status)
        });
          setFlag(true);
      }
      catch(ex) {
          console.log(ex);
      }
       
    };
    
    const fileData = () => { 
      if (state.selectedFile) { 
          
        return ( 
          <Segment> 
            <Header>File Details:</Header> 
            <p>File Name: {state.selectedFile.name}</p> 
            <p>File Type: {state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </Segment> 
        ); 
      } else { 
        return ( 
          <Container> 
            <h4 style={{color:'red'}}>Choose before Pressing the Upload button</h4> 
          </Container> 
        ); 
      } 
    }; 
     
      return ( 
        <Container> 
            <Segment>
                <Form>
                <Form.Field>
                <label>File input & upload </label>
                <Button as="label" htmlFor="file" type="button" animated="fade">
                  <Button.Content visible>
                    <Icon name="file" />
                  </Button.Content>
                  <Button.Content hidden>Choose a File</Button.Content>
                </Button>
                <input
                  type="file"
                  id="file"
                  hidden
                  onChange={onFileChange}
                />
                {state.selectedFile &&
                <Form.Input
                fluid
                label="File Chosen: "
                placeholder="Use the above bar to browse your file system"
                readOnly
                value={state.selectedFile.name}
                
              />
                }
                </Form.Field>
                
                    
                    <Form.Input label='Key' value={key} onChange={onChangeKey} />
                    <Form.Group>
                        <label>Encrypt or Decrypt?</label>
                            <Form.Radio label='encrypt' operation='encrypt' checked={operation === 'encrypt'} onChange={onChangeOperation} />
                      
                            <Form.Radio label='decrypt' operation='decrypt' checked={operation === 'decrypt'} onChange={onChangeOperation} />   
            
                    </Form.Group>
                    {state.selectedFile && operation && key &&
                    <Form.Button onClick={onFileUpload}>Upload</Form.Button>
                    }
                    
                   
                {statusCode && statusCode === 200 ? (
                  <Progress
                    style={{ marginTop: "20px" }}
                    percent={100}
                    success
                    progress
                  >
                    File Upload Success
                  </Progress>
                ) : statusCode && statusCode === 500 ? (
                  <Progress
                    style={{ marginTop: "20px" }}
                    percent={100}
                    error
                    active
                    progress
                  >
                    File Upload Failed
                  </Progress>
                ) : null}
                </Form>
                
            </Segment> 
          {fileData()}
          {flag && <FileDownload/>}
        </Container> 
      ); 
    
  } 
  