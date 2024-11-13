import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Riple } from 'react-loading-indicators';

import './ImageGrid.css'; // Import your custom CSS
import { DataContext } from '../hooks/DataContext';

function ImageGrid() {
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate(`/book/${index}`); // Navigate to the book page with the index
  };

  const { tags, stories } = useContext(DataContext);

  if (!tags.length) {
    return (
      <div className="d-flex flex-color align-items-center justify-content-center w-100 h-100">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      {/* use mock data */}
      {Object.keys(stories).map((type, typeIndex) => (
        <div key={typeIndex}>
          <div className="fs-2 fw-bolder my-4 ps-4 text-decoration-underline">
            {type}
          </div>
          <Row className="pt-3">
            {stories[type].map((book, index) => (
              <Col
                key={index}
                md={4}
                lg={3}
                sm={6}
                xs={12}
                className="mb-4 bookGrid d-flex flex-column align-items-center px-5"
                onClick={() => handleClick(book.id)}
              >
                <div className="d-flex justify-content-center book-cover">
                  <img
                    src={book.cover_image_url}
                    alt="placeholder"
                    className="w-100"
                  />
                </div>
                <div className="fs-4 mt-3">{book.title}</div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
}

export default ImageGrid;
