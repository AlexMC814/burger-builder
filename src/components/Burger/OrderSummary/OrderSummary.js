import React from 'react';
import './OrderSummary.scss';

import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  return (
    <div className='order-summary'>
      <h3>Ваш заказ готов к выполнению</h3>
      <p>
        <strong>Стоимость: {props.price.toFixed(2)} &#x20bd;</strong>
      </p>
      <strong>Оформить его?</strong>
      <div className='order-summary__actions'>
        <Button btnType='danger' clicked={props.cancel}>
          Отменить
        </Button>
        <Button btnType='success' clicked={props.confirm}>
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
