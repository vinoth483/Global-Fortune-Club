import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';
import { useSigninUser } from '../hooks/authHooks';
import { message } from 'antd';
import signupImage from '../Assets/rb_1123.png';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { isSigninError, signinError, isSigninLoading, signinUser, signinUserSuccess } = useSigninUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSigninError && signinError !== '') {
      messageApi.open({
        type: 'error',
        content: signinError,
      });
    } else if (!isSigninError && !isSigninLoading && signinUserSuccess) {
      navigate('/dashboard'); 
    }
  }, [isSigninError, signinError, isSigninLoading, signinUserSuccess, messageApi, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestPayload = { email, password };
    signinUser(requestPayload);
  };

  return (
    <div className="signup-container">
      {contextHolder}
      <div className="signup-image">
        <img src={signupImage} alt="Signup illustration" />
      </div>
      <div className="signup-form">
        <h2>Admin Login</h2>
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
          <button type="submit" disabled={isSigninLoading}>
            {isSigninLoading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
