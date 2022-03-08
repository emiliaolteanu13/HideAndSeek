import { Container, Header } from 'semantic-ui-react';
import './App.css';
import FileUpload from './FileUpload';

function App() {
  return (
    <div className="App">
      <Header size='huge'>
       Hide and Seek
      </Header>
      <Container>
        <FileUpload/>
      </Container>
      
    </div>
  );
}

export default App;
