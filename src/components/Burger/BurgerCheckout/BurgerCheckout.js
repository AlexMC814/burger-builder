import React from 'react';
import './BurgerCheckout.scss';
import Button from '../../UI/Button/Button';

const BurgerCheckout = props => {
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
      <strong>Вам непременно понравится!</strong>
      <div className='checkout__list-container'>
        <ol className='checkout__list'>{checkoutIngredients}</ol>
      </div>
      {/* <div className='checkout__price'>
        Сумма заказа: {props.price.toFixed(2)} &#x20bd;
      </div> */}
      <div className='checkout__actions'>
        <Button btnType='danger' clicked={props.checkoutCancelled}>
          Отменить
        </Button>
        <Button btnType='success' clicked={props.checkoutContinued}>
          Оформить
        </Button>
      </div>
    </div>
  );
};

export default BurgerCheckout;
