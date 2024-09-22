import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/target-path'); // Replace with your desired path
  };

  return (
    <div>
      <button onClick={handleNavigation}>Go to Target</button>
    </div>
  );
};

export default MyComponent;
