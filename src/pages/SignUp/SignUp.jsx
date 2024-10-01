import React, { useState } from 'react';
import './Signup.css';
import closeBtn from '../../Utils/extra/Vector.svg';

const SignUp = ({ handleClose, formType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const type = formType === 'register' ? 'Register' : 'Login';

  const handleSubmit = () => {
    // Store user details in localStorage
    const userDetails = { username, password };
    localStorage.setItem('user', JSON.stringify(userDetails));
    handleClose(); // Close the modal after login/signup
    window.location.reload(); // Reload the page to update the UI
  };

  return (
    <div className="signup-modal show">
      <div className="modal-content">
        <div className='close-btn' onClick={handleClose}>
          <img src={closeBtn} alt="close-btn" />
        </div>
        <h1>{type}</h1>
        <div className='modal-username'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='modal-password'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="register-submit-btn" onClick={handleSubmit}>
          {type}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
