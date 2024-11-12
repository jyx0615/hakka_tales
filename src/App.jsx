import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// import { useEffect } from 'react';

import Book from './components/Book';
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import Content from './components/Content';
import Contact from './components/Contact';
import Upload from './components/Upload';
import './App.css';
import { DataProvider } from './hooks/DataContext';

function App() {
  // const { stories, fetchStories, fetchPages } = useStories();

  // useEffect(() => {
  //   fetchStories();
  //   fetchPages();
  // }, [fetchStories, fetchPages]);

  return (
    <Router>
      <div className="container-fluid px-0 main-container vh-100 vw-100">
        <MyNavbar />
        <Container className="pb-4 custom-container px-2" fluid="xl">
          <DataProvider>
            <Routes>
              {/* <Route path="/" element={<Home stories={stories}/>} />
              <Route path="/book/:index" element={<Book stories={stories}/>} />
              <Route path="/book/:bookIndex/content" element={<Content stories={stories}/>} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/book/:index" element={<Book />} />
              <Route path="/book/:bookIndex/content" element={<Content />} />
            </Routes>
          </DataProvider>
        </Container>
      </div>
    </Router>
  );
}

export default App;
