import React from 'react';
import './NavItems.scss';
import NavItem from './NavItem/NavItem';

const NavItems = props => {
  return (
    <ul className='nav-items'>
      <NavItem link='/'>Конструктор Бургеров</NavItem>
      <NavItem link='/orders'>Мои Заказы</NavItem>
      <NavItem link='/auth'>Регистрация</NavItem>
    </ul>
  );
};

export default NavItems;
