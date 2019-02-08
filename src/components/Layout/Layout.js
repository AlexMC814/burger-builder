import React from 'react';
import './Layout.scss';

const Layout = props => {
  return (
    <React.Fragment>
      <div>Toolbar, Sidebar, Backdrop</div>
      <main className='content'>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
