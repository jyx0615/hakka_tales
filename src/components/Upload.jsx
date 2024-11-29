import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import './Upload.css';

function Upload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Row className="mt-5">
      <Col className="d-flex flex-column align-items-center" md={6} sm={12}>
        <h1>投稿圖片</h1>

        <Form className="px-5 py-2 w-100">
          {/* Image input with Bootstrap styling */}
          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">
              選擇要上傳的影像
            </label>
            <input
              type="file"
              className="form-control"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Displaying the image preview */}
          {image && (
            <div className="mt-3 d-flex flex-column align-items-center mb-3">
              <h4>預覽:</h4>
              <img
                src={image}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxWidth: '80%', height: 'auto' }}
              />
            </div>
          )}

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>聯絡信箱</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              作者
              <span className="ms-3 text-secondary">
                只限中文＋英文，最多20個字
              </span>
            </Form.Label>
            <Form.Control type="name" placeholder="作者姓名" maxLength="20" />
          </Form.Group>

          <Button variant="primary" type="submit" className="float-end">
            提交
          </Button>
        </Form>
      </Col>

      <Col className="d-flex flex-column align-items-center" md={6} sm={12}>
        <h1>投稿故事</h1>
        <Form className="w-100 px-5 py-2">
          <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
            <Form.Label>故事內容</Form.Label>
            <Form.Control as="textarea" rows={10} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>聯絡信箱</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              作者
              <span className="ms-3 text-secondary">
                只限中文＋英文，最多20個字
              </span>
            </Form.Label>
            <Form.Control type="name" placeholder="作者姓名" maxLength="20" />
          </Form.Group>

          <Button variant="primary" type="submit" className="float-end">
            提交
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Upload;
