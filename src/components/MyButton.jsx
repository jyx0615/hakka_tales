import PropTypes from 'prop-types';
import './MyButton.css';

function MyButton({ text, handleClick }) {
    return (
        <div className='btn-container d-flex justify-content-center align-items-center' onClick={handleClick}>
            <span className='pulse-button'>{text}</span>
        </div>
    )
} 

MyButton.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default MyButton;
