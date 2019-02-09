import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BurgerCheckout from '../../components/Burger/BurgerCheckout/BurgerCheckout';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import './BurgerBuilder.scss';

const INGREDIENTS_PRICES = {
  salad: 50,
  cheese: 70,
  meat: 100,
  bacon: 130,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 60,
    purchasable: false,
    purchasing: false,
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0,
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    alert(
      'Ваш заказ оформлен. Наш менеджер свяжется с Вами в ближайшее время.'
    );
    this.setState({
      purchasing: false,
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredient,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] < 1;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            price={this.state.totalPrice}
            cancel={this.purchaseCancelHandler}
            confirm={this.purchaseContinueHandler}
          />
        </Modal>
        <div className='burger-constructor'>
          <div className='burger-constructor__controls'>
            <BuildControls
              add={this.addIngredientHandler}
              remove={this.removeIngredientHandler}
              disabled={disableInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
            />
          </div>
          <div className='burger-constructor__ingredients'>
            <Burger ingredients={this.state.ingredients} />
          </div>
          <div className='burger-constructor__checkout'>
            <BurgerCheckout
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
