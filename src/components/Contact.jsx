import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Contact() {
  return (
    <div className="mt-5 d-flex align-itmes-center justify-content-center">
      <div className="w-100 px-5">
        <h1 className="mb-3 text-center">聯絡我們</h1>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>聯絡信箱</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>請輸入內容</Form.Label>
            <Form.Control as="textarea" rows={10} />
          </Form.Group>

          <Button variant="primary" type="submit" className="float-end">
            提交
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
