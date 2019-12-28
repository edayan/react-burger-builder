import React, { Component } from 'react';
import Order from '../../components/UI/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('/orders.json')
      .then(result => {
        const fetachedOrders = [];
        for (let key in result.data) {
          fetachedOrders.push({
            ...result.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetachedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let order = this.state.orders.map(order => {
      return <Order key={order.id} />;
    });
    return <div>{order}</div>;
  }
}

export default withErrorHandler(Orders, axios);
