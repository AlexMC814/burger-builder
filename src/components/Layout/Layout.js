import React from 'react';
import './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => {
  return (
    <div className='wrapper'>
      <Toolbar />
      <main className='content'>{props.children}</main>
      <footer className='footer'>Footer</footer>
    </div>
  );
};

export default Layout;
