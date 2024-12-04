import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import './Upload.css';

function Upload() {
  const [image, setImage] = useState(null);

  const [authorImage, setAuthorImage] = useState('');
  const [authorImageError, setAuthorImageError] = useState('');
  const [emailImage, setEmailImage] = useState('');
  const [emailImageError, setEmailImageError] = useState('');

  const [authorStory, setAuthorStory] = useState('');
  const [authorStoryError, setAuthorStoryError] = useState('');
  const [emailStory, setEmailStory] = useState('');
  const [emailStoryError, setEmailStoryError] = useState('');

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

  const validateAuthor = (name) => {
    const regex = /^[A-Za-z\u4E00-\u9FFF\s]{1,20}$/;
    if (!regex.test(name)) {
      return '只能包含中英文字與空格且不能超過20字';
    }
    return '';
  };

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!regex.test(email)) {
      return '請輸入有效的電子郵件地址';
    }
    return '';
  };

  const handleAuthorImageChange = (e) => {
    const name = e.target.value;
    setAuthorImage(name);

    const error = validateAuthor(name);
    setAuthorImageError(error);
  };

  const handleAuthorStoryChange = (e) => {
    const name = e.target.value;
    setAuthorStory(name);

    const error = validateAuthor(name);
    setAuthorStoryError(error);
  };

  // Handle email input change and validation for the first form
  const handleEmailImageChange = (e) => {
    const email = e.target.value;
    setEmailImage(email);

    const error = validateEmail(email);
    setEmailImageError(error);
  };

  // Handle email input change and validation for the second form
  const handleEmailStoryChange = (e) => {
    const email = e.target.value;
    setEmailStory(email);

    const error = validateEmail(email);
    setEmailStoryError(error);
  };

  return (
    <Row className="mt-5">
      <Col className="d-flex flex-column align-items-center" md={6} sm={12}>
        <h1>投稿圖片</h1>

        <Form className="px-5 py-2 w-100">
          {/* Image input with Bootstrap styling */}
          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">
              上傳影像
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
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={emailImage}
              onChange={handleEmailImageChange}
              isInvalid={!!emailImageError}
            />
            <Form.Control.Feedback type="invalid">
              {emailImageError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              作者
              <span className="ms-3">只限中文/英文，最多20個字</span>
            </Form.Label>
            <Form.Control
              type="name"
              placeholder="作者姓名"
              maxLength="20"
              value={authorImage}
              onChange={handleAuthorImageChange}
              isInvalid={!!authorImageError}
            />
            <Form.Control.Feedback type="invalid">
              {authorImageError}
            </Form.Control.Feedback>
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
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={emailStory}
              onChange={handleEmailStoryChange}
              isInvalid={!!emailStoryError}
            />
            <Form.Control.Feedback type="invalid">
              {emailStoryError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              作者
              <span className="ms-3">只限中文/英文，最多20個字</span>
            </Form.Label>
            <Form.Control
              type="name"
              placeholder="作者姓名"
              maxLength="20"
              value={authorStory}
              onChange={handleAuthorStoryChange}
              isInvalid={!!authorStoryError}
            />
            <Form.Control.Feedback type="invalid">
              {authorImageError}
            </Form.Control.Feedback>
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
