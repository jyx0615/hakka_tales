import ImageGrid from './ImageGrid';
import { ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Riple } from 'react-loading-indicators';
import PropTypes from 'prop-types';

import './Home.css';
import Marquee from './Marquee';
import useStories from '../hooks/useStories';

function Home({ searchItem }) {
  const { tags, stories, fetchStories } = useStories();
  fetchStories();

  // display the loading icon when data is not loaded
  if (!tags.length) {
    return (
      <div className="d-flex flex-color align-items-center justify-content-center w-100 h-100">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  // tags.forEach((type) => {
  //   console.log(type.name, index);
  //   console.log(stories[type.id]);
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
            {tags.map((type) => (
              <div key={type.id} className="dropdown my-2">
                {/* Hidden checkbox to control the dropdown menu */}
                <input
                  type="checkbox"
                  id={`dropdownCheckbox-${type.id}`}
                  className="dropdown-checkbox"
                  style={{ display: 'none' }}
                />

                {/* Label acting as the dropdown toggle button */}
                <label
                  htmlFor={`dropdownCheckbox-${type.id}`}
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
                  aria-labelledby={`dropdownCheckbox-${type.id}`}
                >
                  {stories[type.name].map((book, index) => (
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
