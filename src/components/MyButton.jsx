import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './MyButton.css';

function MyButton({ text, bookIndex, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${bookIndex}/content/${type}`);
  };

  return (
    // add type as classname

    <div
      className={`custom-btn d-flex align-items-center justify-content-center  ${type}`}
    >
      <button
        href="#"
        className="position-relative d-inline-flex align-items-center justify-content-center px-1 py-2 border-0 bg-transparent rounded-2 custom-button w-100 h-100"
        onClick={handleClick}
      >
        <span className="position-absolute w-100 h-100 rounded-2 shadow-layer"></span>
        <span className="position-absolute w-100 h-100 bg-white rounded-2 border-2 border-secondary"></span>
        <span className="position-absolute w-100 h-100 rounded-2 bg-layer"></span>
        <span className="position-relative text-layer fs-5">{text}</span>
      </button>
    </div>
  );
}

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
  bookIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default MyButton;
