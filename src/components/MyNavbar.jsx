import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import {
  Meta,
  Megaphone,
  PencilSquare,
  TelephoneFill,
} from 'react-bootstrap-icons';

import logo from '../assets/logo.png';
import './MyNavbar.css';

function MyNavbar() {
  // when to become a hamburger icon([false, 'sm', 'md', 'lg', 'xl', 'xxl'])
  const expand = 'lg';
  return (
    <Navbar expand="lg" className="navbar-custom px-2" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="HakkaTales Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className="offcanvas-custom"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown
                title="Links"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item
                  href="https://www.hakka.gov.tw/chhakka/index"
                  target="_blank"
                >
                  台客委員會
                </NavDropdown.Item>

                <NavDropdown.Item href="#action4">
                  近期活動
                  <Megaphone className="text-danger" />
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/upload">
                  投稿專區
                  <PencilSquare />
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/contact">
                  聯絡我們
                  <TelephoneFill className="text-success" />
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action8">
                  臉書專頁
                  <Meta className="text-primary" />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* search button */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="搜尋"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
