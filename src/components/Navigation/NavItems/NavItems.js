import React from 'react';
import './NavItems.scss';
import NavItem from './NavItem/NavItem';

const NavItems = props => {
  return (
    <ul className='nav-items'>
      <NavItem link='/' active>
        Конструктор Бургеров
      </NavItem>
      <NavItem link='/checkout'>Заказ</NavItem>
    </ul>
  );
};

export default NavItems;