import React, { Component } from 'react';
import CheckoutInfo from '../../components/Burger/BurgerCheckout/BurgerCheckout';
import { Route, Redirect } from 'react-router-dom';
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
    let summary = <Redirect to='/' />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <React.Fragment>
          {purchasedRedirect}
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
        </React.Fragment>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.price,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(CheckoutPage);
