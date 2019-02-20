import React from 'react';
import './NavItems.scss';
import NavItem from './NavItem/NavItem';

const NavItems = props => {
  return (
    <ul className='nav-items'>
      <NavItem link='/'>Конструктор Бургеров</NavItem>
      {props.isAuthenticated ? (
        <NavItem link='/orders'>Мои Заказы</NavItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavItem link='/auth'>Войти</NavItem>
      ) : (
        <NavItem link='/logout'>Выйти</NavItem>
      )}
    </ul>
  );
};

export default NavItems;
