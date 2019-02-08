import React, { Component } from 'react';

import propTypes from 'prop-types';

import './BurgerIngredient.scss';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case 'bread-top':
        ingredient = (
          <div className='bread__top'>
            <div className='seeds__1' />
            <div className='seeds__2' />
          </div>
        );
        break;
      case 'bread-bottom':
        ingredient = <div className='bread__bottom' />;
        break;
      case 'meat':
        ingredient = <div className='meat' />;
        break;
      case 'salad':
        ingredient = <div className='salad' />;
        break;
      case 'cheese':
        ingredient = <div className='cheese' />;
        break;
      case 'bacon':
        ingredient = <div className='bacon' />;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: propTypes.string.isRequired,
};

export default BurgerIngredient;
