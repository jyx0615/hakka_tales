import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Book from './components/Book'; // Your book component

import './App.css';
import MyNavbar from './components/MyNavbar';
import ImageGrid from './components/ImageGrid';


function App() {
  return (
    <Router>
      <div>
          <MyNavbar/>
          <Routes>
              <Route path="/" element={<ImageGrid />} />
              <Route path="/book/:index" element={<Book />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;