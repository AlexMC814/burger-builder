import React from 'react';
import './NavItem.scss';

const NavItem = props => {
  return (
    <li className='nav-item'>
      <a href={props.link}>{props.children}</a>
    </li>
  );
};

export default NavItem;
