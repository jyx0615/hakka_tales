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
  House,
} from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';

import logo from '../assets/logo.png';
import fox from '../assets/fox.png';
import useStories from '../hooks/useStories';
import './MyNavbar.css';

function MyNavbar({ handleSearch }) {
  const [inputItem, setInputItem] = useState('');
  const [showOffCanvas, setShowOffcanvas] = useState(false);
  const { categories, stories, fetchCategories } = useStories();
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

        <div className="d-flex align-items-center">
          {/* login/register icon(small screen) */}
          <div className="d-lg-none">
            <LoginLogoutIcon />
          </div>

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
          {/* brand logo */}
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
                <House className="text-primary fs-3 pe-2 d-lg-none d-xl-inline mb-1" />
                主頁
              </Nav.Link>
              <Nav.Link as={Link} to="/activities">
                <Megaphone className="text-danger fs-3 pe-2 d-lg-none d-xl-inline mb-1" />
                近期活動
              </Nav.Link>

              <Nav.Link as={Link} to="/upload">
                <PencilSquare className="text-secondary fs-3 pe-2 d-lg-none d-xl-inline mb-1" />
                投稿專區
              </Nav.Link>

              <Nav.Link as={Link} to="/contact">
                <TelephoneFill className="text-success fs-3 pe-2 d-lg-none d-xl-inline mb-1" />
                聯絡我們
              </Nav.Link>

              {/* link dropdown */}
              <NavDropdown
                title="相關連結"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item
                  href="https://www.hakka.tycg.gov.tw/Default.aspx"
                  target="_blank"
                >
                  桃園市政府客家事務局
                  <BoxArrowInUpRight className="text-secondary" />
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="https://www.hakka.gov.tw/chhakka/index"
                  target="_blank"
                >
                  客家委員會
                  <BoxArrowInUpRight className="text-secondary" />
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="https://www.facebook.com/tychakka?ref=embed_page"
                  target="_blank"
                >
                  桃園市政府客家事務局
                  <Meta className="text-primary" />
                </NavDropdown.Item>

                <NavDropdown.Item
                  href="https://www.facebook.com/www.hakka.gov.tw?mibextid=ZbWKwL"
                  target="_blank"
                >
                  客家委員會
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

            {/* login/register button(large screen) */}
            <Nav className="flex-grow-1 me-auto justify-content-end align-items-center pe-2 d-lg-flex d-none">
              <LoginLogoutIcon />
            </Nav>

            {/* search button */}
            {/* set w-25 when screen is large and do not w-100 when screen is small */}
            <Form className="d-flex mh-100 justify-content-end align-items-center custom-input">
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

const LoginLogoutIcon = () => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const getImageOfUser = () => {
    if (user.picture) {
      return user.picture;
    } else {
      return fox;
    }
  };

  return user ? (
    <div className="me-3 dropdown person-image-container">
      <img
        id="user-image"
        data-bs-toggle="dropdown"
        aria-expanded="true"
        role="button"
        className="me-3 person-icon dropdown-toggle contain"
        src={getImageOfUser()}
        alt="user profile"
        height="30"
      />
      <div
        aria-labelledby="user-image"
        data-bs-popper="static"
        className="dropdown-menu dropdown-menu-start py-1 mt-2"
        style={{ minWidth: '60px' }}
      >
        <a className="dropdown-item px-2 text-center" onClick={() => logout()}>
          登出
        </a>
      </div>
    </div>
  ) : (
    <PersonCircle
      className="fs-2 me-3 person-icon"
      onClick={() => loginWithRedirect()}
    />
  );
};

export default MyNavbar;
