import React, { Component } from 'react';
import Buttton from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { withRouter } from 'react-router-dom';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Edayan',
        address: {
          street: 'Muttom',
          zipCode: '685589',
          country: 'India'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
          type="text"
          name="name"
          inputtype="input"
          placeholder="Your Name"
        />
        <Input
          type="email"
          name="email"
          inputtype="input"
          placeholder="Your Mail"
        />
        <Input
          type="text"
          name="street"
          inputtype="input"
          placeholder="Your Street"
        />
        <Input
          type="text"
          name="postal"
          inputtype="input"
          placeholder="Postal Code"
        />
        <Buttton btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Buttton>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
