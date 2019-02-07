import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import './Layout.scss';

const Layout = props => {
  return (
    <Wrapper>
      <div>Toolbar, Sidebar, Backdrop</div>
      <main className='content'>{props.children}</main>
    </Wrapper>
  );
};

export default Layout;
