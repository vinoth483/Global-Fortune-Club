import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css'; // For styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedUp = localStorage.getItem('isSignedUp');
    if (isSignedUp) {
      navigate('/dashboard'); // Redirect to dashboard if signed up
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    localStorage.setItem('isSignedUp', 'true'); // Set signup state
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src="path-to-your-image" alt="Signup illustration" />
      </div>
      <div className="signup-form">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
