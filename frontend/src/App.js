
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routing } from './componnets/routing';
import { Nav } from './componnets/nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routing></Routing>
      </BrowserRouter>
    </div>
  );
}

export default App;
