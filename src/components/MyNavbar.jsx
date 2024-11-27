import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Meta,
  BoxArrowInUpRight,
} from 'react-bootstrap-icons';

import logo from '../assets/logo.png';
import './MyNavbar.css';

function MyNavbar({ handleSearch }) {
  const [inputItem, setInputItem] = useState('');
  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputItem(e.target.value);
  };

  // Call the onSearch callback with the current search term
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(inputItem);
      setInputItem("");
      closeOffcanvas();
    }
  };

  const handleSubmit = () => {
    handleSearch(inputItem);
    setInputItem("");
    closeOffcanvas();
  }

  const goToHome = () => {
    handleSearch("");
    setInputItem("");
    closeOffcanvas();
    navigate("/");
  }

  const closeOffcanvas = () => setShowOffcanvas(false);
  const openOffcanvas = () => setShowOffcanvas(true);

  // when to become a hamburger icon([false, 'sm', 'md', 'lg', 'xl', 'xxl'])
  const expand = 'lg';
  return (
    <Navbar expand="lg" className="navbar-custom px-2" sticky="top">
      <Container fluid>
        <Navbar.Brand  onClick={goToHome}>
          <img
            src={logo}
            alt="HakkaTales Logo"
            height="30"
            className="d-inline-block align-top logo-image"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}
        onClick={openOffcanvas}/>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className="offcanvas-custom ms-auto"
          show={showOffCanvas}
          onHide={closeOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} onClick={goToHome}>
              <img
                src={logo}
                alt="HakkaTales Logo"
                // height="30"
                className="d-inline-block align-top logo-image"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3">
              <Nav.Link href="/">主頁</Nav.Link>
              <Nav.Link href="#action4"> 近期活動</Nav.Link>
              <Nav.Link as={Link} to="/upload">投稿專區</Nav.Link>
              <Nav.Link as={Link} to="/contact">聯絡我們</Nav.Link>
              
              <NavDropdown
                title="Links"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item
                  href="https://www.hakka.gov.tw/chhakka/index"
                  target="_blank"
                >
                  客家委員會
                  <BoxArrowInUpRight className="text-secondary" />
                </NavDropdown.Item>

                <NavDropdown.Item href="#action8">
                  臉書專頁
                  <Meta className="text-primary" />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* search button */}
            <Form className="d-flex mh-100">
              <Form.Control
                type="search"
                placeholder="搜尋"
                className="me-2"
                aria-label="Search"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <Button
                variant="outline-success"
                onClick={() => handleSubmit()}
              >
                Search
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

MyNavbar.propTypes = {
  handleSearch: PropTypes.func,
};

export default MyNavbar;
