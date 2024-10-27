import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './ImageGrid.css'; // Import your custom CSS

function ImageGrid() {
    const navigate = useNavigate();

    const handleClick = (index) => {
        navigate(`/book/${index}`); // Navigate to the book page with the index
    };

    const bookNames = [
        '虎姑婆',
        '媽祖',
        '老鼠娶新娘',
        '年獸',
        '灶馬爺',
        '春牛圖'
    ];
  
    return (
    <Container>
      <Row>
        {bookNames.map((bookName, index) => (
            <Col key={index} md={4} lg={3} sm={6} xs={12} className="mb-4 p-3 bookGrid" 
                onClick={() => handleClick(index)}>
                <div className="bookContainer d-flex justify-content-center">
                    <span className='fs-3 fw-bolder bookName'>{bookName}</span>
                </div>
            </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ImageGrid;
