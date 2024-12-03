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
import { useEffect, useState } from 'react';
import {
  Meta,
  TelephoneFill,
  BoxArrowInUpRight,
  Search,
  ChevronDown,
  Megaphone,
  PencilSquare,
  PersonCircle,
} from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';

import logo from '../assets/logo.png';
import useStories from '../hooks/useStories';
import './MyNavbar.css';

function MyNavbar({ handleSearch }) {
  const [inputItem, setInputItem] = useState('');
  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const { categories, stories, fetchCategories } = useStories();
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

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

  const handleLoginLogout = () => {
    if (!user) {
      loginWithRedirect();
    } else {
      logout();
    }
  };

  const closeOffcanvas = () => setShowOffcanvas(false);
  const openOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

        <div>
          {/* login/register icon */}
          <PersonCircle
            className="fs-2 d-lg-none me-3"
            id="login-logout-icon"
            onClick={() => handleLoginLogout()}
          />

          {/* hamburger icon */}
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            onClick={openOffcanvas}
          />
        </div>

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
            <Nav className="flex-grow-1 pe-4 me-auto justify-content-start">
              <Nav.Link as={Link} to="/">
                主頁
              </Nav.Link>
              <Nav.Link href="#action4">
                <Megaphone className="text-danger fs-3 pe-2 d-lg-none d-xl-inline" />
                近期活動
              </Nav.Link>

              <Nav.Link as={Link} to="/upload">
                <PencilSquare className="text-secondary fs-3 pe-2 d-lg-none d-xl-inline" />
                投稿專區
              </Nav.Link>

              <Nav.Link as={Link} to="/contact">
                <TelephoneFill className="text-success fs-3 pe-2 d-lg-none d-xl-inline" />
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
                {categories &&
                  categories.map((category) => (
                    <div key={category.id} className="dropdown my-2">
                      {/* Hidden checkbox to control the dropdown menu */}
                      <input
                        type="checkbox"
                        id={`book-dropdown-checkbox-${category.id}`}
                        className="dropdown-checkbox"
                        style={{ display: 'none' }}
                      />

                      {/* Label acting as the dropdown toggle button */}
                      <label
                        htmlFor={`book-dropdown-checkbox-${category.id}`}
                        className="btn bg-transparent border-0"
                      >
                        <span className="custom-a text-decoration-none">
                          {category.name}
                          <ChevronDown className="ms-1" />
                        </span>
                      </label>

                      {/* Dropdown Menu */}
                      <ul
                        className="dropdown-menu bg-transparent border-0"
                        aria-labelledby={`book-dropdown-checkbox-${category.id}`}
                      >
                        {stories[category.name] &&
                          stories[category.name].map((book, index) => (
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

            {/* login/register button */}
            <Nav className="flex-grow-1 me-auto justify-content-end align-items-center pe-2 d-lg-flex d-none">
              {/* login button */}
              {!isLoading && (
                <span onClick={() => handleLoginLogout()} id="login-logout-btn">
                  {user ? '登出' : '登入'}
                </span>
              )}
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
