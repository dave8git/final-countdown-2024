import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { fetchCartProducts } from '../../redux/cartReducer';
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
              <Col key={product.id} md={4} className="d-flex justify-content-center">
                <CartItem product={product} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/">
              <Button variant="secondary">Back to Main Page</Button>
            </Link>
            <Link to="/checkout">
              <Button variant="primary">Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;