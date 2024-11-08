import ImageGrid from './ImageGrid';
import { ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import './Home.css';
import Marquee from './Marquee';

function Home() {
  const books = {
    台灣民間故事: ['虎姑婆', '媽祖', '老鼠娶新娘', '年獸', '灶馬爺', '春牛圖'],
    安徒生童話故事: ['虎姑婆', '媽祖', '老鼠娶新娘'],
    新星專區: ['虎姑婆', '媽祖', '老鼠娶新娘'],
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="pt-3">
        <Marquee />
      </div>

      <div className="row w-100">
        {/* the main contains that shows all books */}
        <div className="col docItemCol_VOVn">
          <ImageGrid />
        </div>

        {/* side bar that displays all the book names and hide when the screen is too small */}
        <div className="col col-2 pt-5 d-lg-block d-none">
          <div className="position-fixed border-start border-3">
            {Object.keys(books).map((type, typeIndex) => (
              <div key={typeIndex} className="dropdown my-2">
                {/* Hidden checkbox to control the dropdown menu */}
                <input
                  type="checkbox"
                  id={`dropdownCheckbox-${typeIndex}`}
                  className="dropdown-checkbox"
                  style={{ display: 'none' }}
                />

                {/* Label acting as the dropdown toggle button */}
                <label
                  htmlFor={`dropdownCheckbox-${typeIndex}`}
                  className="btn bg-transparent border-0"
                >
                  <span className="custom-a text-decoration-none">
                    {type}
                    <ChevronDown className="ms-1" />
                  </span>
                </label>

                {/* Dropdown Menu */}
                <ul
                  className="dropdown-menu bg-transparent border-0"
                  aria-labelledby={`dropdownCheckbox-${typeIndex}`}
                >
                  {books[type].map((bookName, index) => (
                    <li
                      key={index}
                      className="list-group-item bg-transparent border-0"
                    >
                      <Link
                        to={`/book/${index}`}
                        className="text-decoration-none custom-a dropdown-item"
                      >
                        {bookName}
                      </Link>
                      {/* <a href={`/book/${index}`}className="text-decoration-none custom-a dropdown-item">{bookName}</a> */}
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

export default Home;
