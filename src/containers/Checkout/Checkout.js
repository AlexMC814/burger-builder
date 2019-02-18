import React, { Component } from 'react';
import CheckoutInfo from '../../components/Burger/BurgerCheckout/BurgerCheckout';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';

class CheckoutPage extends Component {
  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutInfo
          ingredients={this.props.ings}
          checkoutCancelled={this.cancelHandler}
          checkoutContinued={this.continueHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.props.ings}
              price={this.props.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.price,
  };
};

export default connect(mapStateToProps)(CheckoutPage);
