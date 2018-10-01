import React from 'react'
import shortid from 'shortid';

import List from '../../components/List/index'
import Total from '../../components/Total';
import { CheckoutContainer, CartContainer } from "./styled-components";

class Checkout extends React.Component {
  state = {
    cartItems: [
      {
        id: shortid.generate(),
        name: 'Cane Sugar',
        qty: 1,
        price: 3.21
      },
      {
        id: shortid.generate(),
        name: 'Dozen Eggs',
        qty: 2,
        price: 2.82
      },
      {
        id: shortid.generate(),
        name: 'Sausage',
        qty: 1,
        price: 4.85
      }
    ],
    total: 0
  };

  componentDidMount() {
    this.setState({ total: this.calculateTotal(this.state.cartItems) });
  }

  calculateTotal = (cartItems) => cartItems.reduce((accum, curr) => (accum + curr.price * curr.qty), 0);

  updateQty = (id, action) => {
    const { cartItems } = this.state;
    const updatedCartItems = cartItems.map((curr) => {
      const qty = (curr.id === id
        ? action === 'add'
          ? curr.qty + 1
            : Math.max(0, curr.qty - 1)
        : curr.qty);

      return {
        ...curr,
        qty
      };
    });

    this.setState({
      cartItems: updatedCartItems,
      total: this.calculateTotal(updatedCartItems)
    });

  };

  render() {
    const { cartItems, total } = this.state;

    return (
      <CheckoutContainer>
        <CartContainer>
          <List items={cartItems} updateQty={this.updateQty}>
            <Total amount={total} align={'right'} />
          </List>
        </CartContainer>
      </CheckoutContainer>
    )
  }
}

export default Checkout