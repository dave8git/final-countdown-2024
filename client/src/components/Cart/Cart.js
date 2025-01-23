import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems, fetchCartProducts } from '../../redux/cartReducer';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const cartProducts = useSelector(state => state.cart.products || []);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartProducts.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          return (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>Quantity: {cartItem.quantity}</p>
              <p>Price: ${product.price}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cart;