// WelcomeOverlay.js
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Welcome.css';

function Welcome({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Match animation duration

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [onClose]);

  return (
    <div className="welcome-overlay">
      <div className="welcome-image"></div>
    </div>
  );
}

Welcome.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

export default Welcome;
