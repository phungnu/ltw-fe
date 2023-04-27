import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Books from './components/Books';
import Book from './components/Book';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Books/>}/>
          <Route path='books' element={ <Books/>}/>
          <Route path='book' element={ <Book/>}/>
          <Route path='book/:id' element={ <Book/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
