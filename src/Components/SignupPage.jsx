import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css'; // For styling
import {useSigninUser} from "../hooks/authHooks"
import { message } from "antd";


const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const {isSigninError,signinError,isSigninLoading,signinUser}=useSigninUser()

  useEffect(()=>{
    if(isSigninError&& signinError !==""){
      messageApi.open({
        type: 'error',
        content:signinError ,
      });
    }
  },[isSigninError,signinError,messageApi])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // After successful signup, navigate to the dashboard
    let requestPayload={
      email,
      password
    }
    signinUser(requestPayload)

  };

  return (
    <div className="signup-container">
      {contextHolder}
      <div className="signup-image">
        <img src="path-to-your-image" alt="Signup illustration" />
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
          <button type="submit" disabled={isSigninLoading}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
