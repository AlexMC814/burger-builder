import React from 'react';
import './Logo.scss';
import logo from '../../assets/icons/logo.svg';

const Logo = props => {
  return (
    <div className='logo'>
      <img src={logo} alt='Вкусно-Бургер' />
    </div>
  );
};

export default Logo;
