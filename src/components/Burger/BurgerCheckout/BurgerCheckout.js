import React from 'react';
import './BurgerCheckout.scss';

const BurgerCheckout = props => {
  //console.log(props.ingredients);
  let checkoutIngredients = Object.keys(props.ingredients).map((ing, i) => {
    return (
      <li key={i}>
        {ing}..................{props.ingredients[ing]}
      </li>
    );
  });

  return (
    <div className='checkout'>
      <h2>Ваш Заказ</h2>
      <div className='checkout__list-container'>
        <ol className='checkout__list'>{checkoutIngredients}</ol>
      </div>
      <div className='checkout__price'>
        Сумма заказа: {props.price.toFixed(2)} &#x20bd;
      </div>
    </div>
  );
};

export default BurgerCheckout;
