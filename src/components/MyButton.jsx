import PropTypes from 'prop-types';
import './MyButton.css';

function MyButton({ text }) {
    return (
        <div className='btn-container d-flex justify-content-center align-items-center'>
            <span className='pulse-button'>{text}</span>
        </div>
    )
} 

MyButton.propTypes = {
    text: PropTypes.string.isRequired,
};

export default MyButton;
