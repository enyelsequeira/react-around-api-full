import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = ({ heading, buttonText, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(password, email);
  };

  return (
    <div className="login">
      <p className="login__welcome">{heading}</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          id="username"
          placeholder="Email"
          required
          name="username"
          type="text"
          onChange={handleEmailChange}
        />
        <input
          className="login__input"
          id="password"
          required
          name="password"
          type="password"
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <button type="submit" className="login__button">
          {buttonText}
        </button>
      </form>

      <p className="login__register">
        Not a member yet?{' '}
        <Link className="login__register-link" to="/signup">
          Sign up here!
        </Link>
      </p>
    </div>
  );
};

export default withRouter(Login);
