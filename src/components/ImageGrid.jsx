import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Riple } from 'react-loading-indicators';
import PropTypes from 'prop-types';

import './ImageGrid.css'; // Import your custom CSS
import useStories from '../hooks/useStories';

function ImageGrid({ searchItem }) {
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate(`/book/${index}`); // Navigate to the book page with the index
  };

  const { tags, stories } = useStories();
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    filterStories();
  }, [searchItem, stories]);

  const filterStories = () => {
    if (searchItem === '') {
      setFilteredStories(stories);
    }
    const tmpStories = {};
    for (const [type, books] of Object.entries(stories)) {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchItem.toLowerCase())
      );

      if (filteredBooks.length > 0) {
        tmpStories[type] = filteredBooks;
      }
    }
    setFilteredStories(tmpStories);
  };

  // show the loading icon when data is not loaded
  if (!tags.length) {
    return (
      <div className="d-flex flex-color align-items-center justify-content-center w-100 h-100">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  // no matched books
  if(Object.keys(filteredStories).length == 0){
    return (
      <div className='d-flex flex-column align-items-center mt-5'>
        <h3 className='mb-3'>查詢結果： 0</h3>
        <h4 className='text-danger'>請更改搜索詞</h4>
      </div>
    )
  }

  return (
    <>
      {/* use mock data */}
      {Object.keys(filteredStories).map((type, typeIndex) => (
        <div key={typeIndex}>
          <div className="fs-2 fw-bolder my-4 ms-4">
            <span className='bg-secondary p-2 rounded-3'>
              {type}
            </span>
          </div>
          <Row className="pt-3">
            {filteredStories[type].map((book, index) => (
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

ImageGrid.propTypes = {
  searchItem: PropTypes.string,
};

export default ImageGrid;
