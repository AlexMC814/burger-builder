import React from 'react';
import './Order.scss';

const Order = props => {
  const ingredients = [];

  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName],
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className='order'>
      <p>Ингредиенты: {ingredientOutput}</p>
      <p>
        Цена: <strong>{Number.parseFloat(props.price).toFixed(2)} руб.</strong>
      </p>
    </div>
  );
};

export default Order;
