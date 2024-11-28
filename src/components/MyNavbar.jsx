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
  TelephoneFill,
  BoxArrowInUpRight,
  Search,
  ChevronDown,
} from 'react-bootstrap-icons';

import logo from '../assets/logo.png';
import useStories from '../hooks/useStories';
import './MyNavbar.css';

function MyNavbar({ handleSearch }) {
  const [inputItem, setInputItem] = useState('');
  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const { tags, stories } = useStories();
  const navigate = useNavigate();

  // when to become a hamburger icon([false, 'sm', 'md', 'lg', 'xl', 'xxl'])
  const expand = 'lg';

  const handleInputChange = (e) => {
    setInputItem(e.target.value);
  };

  // Call the onSearch callback with the current search term
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(inputItem);
      setInputItem('');
      closeOffcanvas();
      navigate('/');
    }
  };

  const handleSubmit = () => {
    handleSearch(inputItem);
    setInputItem('');
    closeOffcanvas();
    navigate('/');
  };

  const goToHome = () => {
    handleSearch('');
    setInputItem('');
    closeOffcanvas();
    navigate('/');
  };

  const goToBook = (id) => {
    closeOffcanvas();
    navigate(`/book/${id}`);
  };

  const closeOffcanvas = () => setShowOffcanvas(false);
  const openOffcanvas = () => setShowOffcanvas(true);

  return (
    <Navbar expand="lg" className="navbar-custom px-2" sticky="top">
      <Container fluid>
        <Navbar.Brand onClick={goToHome}>
          <img
            src={logo}
            alt="HakkaTales Logo"
            height="30"
            className="d-inline-block align-top logo-image"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          onClick={openOffcanvas}
        />

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          className="offcanvas-custom"
          show={showOffCanvas}
          onHide={closeOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expand}`}
              onClick={goToHome}
            >
              <img
                src={logo}
                alt="HakkaTales Logo"
                height="30"
                className="d-inline-block align-top logo-image"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-grow-1 pe-3 me-auto justify-content-start">
              <Nav.Link href="/">主頁</Nav.Link>
              <Nav.Link href="#action4"> 近期活動</Nav.Link>
              <Nav.Link as={Link} to="/upload">
                投稿專區
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                <TelephoneFill className="text-success" />
                聯絡我們
              </Nav.Link>

              {/* link dropdown */}
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

                <NavDropdown.Item
                  href="https://www.facebook.com/www.hakka.gov.tw?mibextid=ZbWKwL"
                  target="_blank"
                >
                  臉書專頁
                  <Meta className="text-primary" />
                </NavDropdown.Item>
              </NavDropdown>

              {/* book dropdown */}
              <NavDropdown
                title="Books"
                id="book-dropdown"
                className={showOffCanvas ? 'd-block' : 'd-none'}
              >
                {tags.map((type) => (
                  <div key={type.id} className="dropdown my-2">
                    {/* Hidden checkbox to control the dropdown menu */}
                    <input
                      type="checkbox"
                      id={`book-dropdown-checkbox-${type.id}`}
                      className="dropdown-checkbox"
                      style={{ display: 'none' }}
                    />

                    {/* Label acting as the dropdown toggle button */}
                    <label
                      htmlFor={`book-dropdown-checkbox-${type.id}`}
                      className="btn bg-transparent border-0"
                    >
                      <span className="custom-a text-decoration-none">
                        {type.name}
                        <ChevronDown className="ms-1" />
                      </span>
                    </label>

                    {/* Dropdown Menu */}
                    <ul
                      className="dropdown-menu bg-transparent border-0"
                      aria-labelledby={`book-dropdown-checkbox-${type.id}`}
                    >
                      {stories[type.name].map((book, index) => (
                        <li
                          key={index}
                          className="list-group-item bg-transparent border-0 dropdown-item"
                          onClick={() => goToBook(book.id)}
                        >
                          {book.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
              <Button variant="outline-success" onClick={() => handleSubmit()}>
                <Search />
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
