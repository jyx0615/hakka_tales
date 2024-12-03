import ImageGrid from './ImageGrid';
import { CartDash, ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Riple } from 'react-loading-indicators';
import PropTypes from 'prop-types';

import './Home.css';
import Marquee from './Marquee';
import useStories from '../hooks/useStories';

function Home({ searchItem }) {
  const { categories, stories, fetchStories, fetchCategories } = useStories();

  // display the loading icon when data is not loaded
  if (!categories.length) {
    fetchCategories();
    fetchStories();
    return (
      <div className="d-flex flex-color align-items-center justify-content-center w-100 h-100">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  // categories.forEach((category) => {
  //   console.log(category.name, index);
  //   console.log(stories[category.id]);
  // });

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="pt-3 mb-4">
        <Marquee />
      </div>

      <div className="row w-100 h-100">
        {/* the main contains that shows all books */}
        <div className="col docItemCol_VOVn">
          <ImageGrid searchItem={searchItem} />
        </div>

        {/* side bar that displays all the book names and hide when the screen is too small */}
        <div className="col col-2 pt-5 d-lg-block d-none">
          <div className="position-fixed border-start border-3">
            {categories && categories.map((category) => (
              <div key={category.id} className="dropdown my-2">
                {/* Hidden checkbox to control the dropdown menu */}
                <input
                  type="checkbox"
                  id={`dropdownCheckbox-${category.id}`}
                  className="dropdown-checkbox"
                  style={{ display: 'none' }}
                />

                {/* Label acting as the dropdown toggle button */}
                <label
                  htmlFor={`dropdownCheckbox-${category.id}`}
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
                  aria-labelledby={`dropdownCheckbox-${category.id}`}
                >
                  {stories[category.name] && stories[category.name].map((book, index) => (
                    <li
                      key={index}
                      className="list-group-item bg-transparent border-0"
                    >
                      <Link
                        to={`/book/${book.id}`}
                        className="text-decoration-none custom-a dropdown-item"
                      >
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  searchItem: PropTypes.string,
};

export default Home;
