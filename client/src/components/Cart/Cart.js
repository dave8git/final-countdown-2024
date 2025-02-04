import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, Badge, Button, Row, Col, Form } from 'react-bootstrap';
import { getCartItems, fetchCartProducts, updateCartQuantity, deleteCartItem } from '../../redux/cartReducer';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';

function Cart() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.data);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Your Cart</h1>
      {cartProducts.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty</p>
      ) : (
        <>
          <Row className="g-4">
            {cartProducts.map((product) => (
              <CartItem product={product} />
            ))}
          </Row>
          <Link to={`/checkout`}>
            <Button variant="primary">Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;