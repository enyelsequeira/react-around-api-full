/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/SVGHEADER.svg';

const Header = ({ email, onClick, linkText, link }) => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <div className="header__content">
        <p className="header__text">{email}</p>
        <Link className="header__text-link" to={link}>
          <span onClick={onClick}>{linkText}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
