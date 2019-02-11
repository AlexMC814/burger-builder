import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import BurgerCheckout from '../../components/Burger/BurgerCheckout/BurgerCheckout';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

import './BurgerBuilder.scss';

const INGREDIENTS_PRICES = {
  Салат: 50,
  Сыр: 70.99,
  Мясо: 100.5,
  Бекон: 110.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 60,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('https://burger-builder-8113b.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch(err => {
        this.setState({ err: true });
      });
  }

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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alex Musarov',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Russia',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
      });
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

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Не удалось загрузить ингредиенты</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
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
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          cancel={this.purchaseCancelHandler}
          confirm={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
