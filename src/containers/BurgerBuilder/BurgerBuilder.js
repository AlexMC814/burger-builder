import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
// import BurgerCheckout from '../../components/Burger/BurgerCheckout/BurgerCheckout';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

import axios from '../../axios-orders';

import './BurgerBuilder.scss';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get('https://burger-builder-8113b.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({
    //       ingredients: response.data,
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({ err: true });
    //   });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 60);

    return sum > 60;
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
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
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
    if (this.props.ings) {
      burger = (
        <div className='burger-constructor'>
          <div className='burger-constructor__controls'>
            <BuildControls
              add={this.props.onIngredientAdded}
              remove={this.props.onIngredientRemoved}
              disabled={disableInfo}
              price={this.props.price}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
            />
          </div>
          <div className='burger-constructor__ingredients'>
            <Burger ingredients={this.props.ings} />
          </div>
          {/* <div className='burger-constructor__checkout'>
            <BurgerCheckout
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
            />
          </div> */}
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({
        type: actions.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actions.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
