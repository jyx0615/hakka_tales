import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Book from './components/Book'; // Your book component
import MyNavbar from './components/MyNavbar';
import ImageGrid from './components/ImageGrid';
// import Welcome from './components/Welcome'; // Import the overlay component
import Content from './components/Content';
import './App.css';
// import { useState, useEffect } from 'react';


function App() {
  // const [showWelcome, setShowWelcome] = useState(true);

  // useEffect(() => {
  //   // Check if welcome has been shown before
  //   const hasShownWelcome = localStorage.getItem('hasShownWelcome');
  //   if (!hasShownWelcome) {
  //     setShowWelcome(true);
  //     localStorage.setItem('hasShownWelcome', 'true'); // Set flag in local storage
  //   }
  // }, []);

  // const handleCloseWelcome = () => {
  //   setShowWelcome(false); // Close the welcome overlay
  // };

  return (
    <Router>
      <div className='container-fluid px-0 main-container vh-100 vw-100'>
        {/* {showWelcome && <Welcome onClose={handleCloseWelcome} />} */}
        <MyNavbar className='px-3 w-100'/>
        <Container className='pb-4 custom-container w-100'>
          <Routes>
            <Route path="/" element={<ImageGrid/>} />
            <Route path="/book/:index" element={<Book />} />
            <Route path="/book/:bookIndex/content" element={<Content />} />
          </Routes>
        </Container>
        
      </div>
    </Router>
  );
}

export default App;
