import React from 'react';
import './Toolbar.scss';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const Toolbar = props => {
  return (
    <header className='toolbar'>
      <div>Menu</div>
      <Logo />
      <nav>
        <NavItems />
      </nav>
    </header>
  );
};

export default Toolbar;
