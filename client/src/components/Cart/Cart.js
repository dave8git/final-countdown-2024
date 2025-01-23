import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, Badge, Button, Row, Col } from 'react-bootstrap';
import { getCartItems, fetchCartProducts } from '../../redux/cartReducer';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const cartProducts = useSelector((state) => state.cart.products || []);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty</p>
      ) : (
        <Row className="g-4">
          {cartProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            return (
              <Col key={product.id} md={6} lg={4}>
                <Card className="shadow-lg rounded">
                  {product.image && (
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="text-primary fw-bold">
                      {product.name}
                    </Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Quantity:</strong> {cartItem.quantity}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Price (Each):</strong>{' '}
                        <Badge bg="info" className="fs-6">${product.price}</Badge>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Total Price:</strong>{' '}
                        <Badge bg="success" className="fs-6">
                          ${product.price * cartItem.quantity}
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="danger">Remove</Button>
                      <Button variant="primary">Checkout</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default Cart;