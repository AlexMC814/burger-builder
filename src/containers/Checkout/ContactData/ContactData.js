import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';

import './ContactData.scss';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ваше имя',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 15,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Улица',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      house: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Номер дома',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      flat: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Номер квартиры',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Быстрый' },
            { value: 'cheapest', displayValue: 'Недорогой' },
          ],
        },
        value: 'Быстрый',
        validation: {},
        valid: true,
      },
      message: {
        elementType: 'textarea',
        elementConfig: {
          type: 'textarea',
          placeholder: 'Дополнительная информация',
        },
        value: '',
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post('orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormEl = { ...updatedOrderForm[inputId] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;
    updatedOrderForm[inputId] = updatedFormEl;

    let formIsValid = true;
    for (inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button
          disabled={!this.state.formIsValid}
          btnType='success'
          clicked={this.orderHandler}>
          Заказать
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className='contact-data'>
        <h4>Ваши контактные данные</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
