import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './ImageGrid.css'; // Import your custom CSS

function ImageGrid() {
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate(`/book/${index}`); // Navigate to the book page with the index
  };

  const books = {
    台灣民間故事: ['虎姑婆', '媽祖', '老鼠娶新娘', '年獸', '灶馬爺', '春牛圖'],
    安徒生童話故事: ['虎姑婆', '媽祖', '老鼠娶新娘'],
    新星專區: ['虎姑婆', '媽祖', '老鼠娶新娘'],
  };

  return (
    <>
      {Object.keys(books).map((type, typeIndex) => (
        <div key={typeIndex}>
          <div className="fs-2 fw-bolder my-4 ps-4 text-decoration-underline">
            {type}
          </div>
          <Row className="pt-3">
            {books[type].map((bookName, index) => (
              <Col
                key={index}
                md={4}
                lg={3}
                sm={6}
                xs={12}
                className="mb-4 bookGrid d-flex flex-column align-items-center px-5"
                onClick={() => handleClick(index)}
              >
                {/* <div className="bookContainer d-flex justify-content-center">
                            <span className='fs-3 fw-bolder bookName'>{bookName}</span>
                        </div> */}
                <div className="d-flex justify-content-center book-cover">
                  <img
                    src="https://cdn.cite.com.tw/images/g/GD0382C.jpg"
                    alt="placeholder"
                    className="w-100"
                  />
                </div>
                <div className="fs-4 mt-3">{bookName}</div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
}

export default ImageGrid;
