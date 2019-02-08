import React from 'react';

import './Burger.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingName => {
      console.log('Ingredient name:', ingName);
      return [...Array(props.ingredients[ingName])].map((_, i) => {
        console.log('Igredient value index:', ingName + ' ' + i);
        return <BurgerIngredient key={ingName + i} type={ingName} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p className='no-ingredients'>Добавьте ингредиенты</p>
    );
  }
  return (
    <div className='burger'>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
