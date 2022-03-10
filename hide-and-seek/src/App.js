import { Container } from 'semantic-ui-react';
import './App.css';
import FileUpload from './FileUpload';

function App() {
  return (
    <div className="App">
      <div className="app-title">
        <h1>Hide And Seek<span>Encrypt or decrypt your files</span></h1>
      </div>
      <Container>
        <FileUpload/>
      </Container>
      
    </div>
  );
}

export default App;
