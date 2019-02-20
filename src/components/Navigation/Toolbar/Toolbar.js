import React from 'react';
import './Toolbar.scss';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

import menu from '../../../assets/icons/menu.svg';

const Toolbar = props => {
  return (
    <header className='toolbar'>
      <div className='toolbar__menu' onClick={props.show}>
        <img src={menu} alt='' />
      </div>
      <div className='toolbar__logo'>
        <Logo />
      </div>
      <nav>
        <NavItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
