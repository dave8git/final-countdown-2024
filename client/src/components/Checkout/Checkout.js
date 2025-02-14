import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, Button, Row, Col, Form, Modal } from 'react-bootstrap';
import { fetchCartProducts } from '../../redux/cartReducer';
import { Link } from 'react-router-dom';
import { API_URL } from '../../redux/postsReducer';
import axios from 'axios';

function Checkout() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.data);
  const [formData, setFormData] = useState({ customer: '', address: '', email: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const totalAmount = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const summary = {
      ...formData,
      products: cartProducts,
    };
    try {
      await axios.post(`${API_URL}/orders`, summary);
      setShowModal(true); // Show modal on successful order submission
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Checkout</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Order Summary</Card.Header>
            <ListGroup variant="flush">
              {cartProducts.map((product) => (
                <ListGroup.Item key={product.id}>
                  <Row>
                    <Col>{product.name}</Col>
                    <Col className="text-end">${(product.price * product.quantity).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <Row>
                  <Col><strong>Total</strong></Col>
                  <Col className="text-end"><strong>${totalAmount.toFixed(2)}</strong></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Shipping Information</Card.Header>
            <Card.Body>
              <Form onSubmit={handleOrderSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="customer" value={formData.customer} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <Link to="/cart">
          <Button variant="secondary" className="me-2">Back to Cart</Button>
        </Link>
        <Link to="/">
          <Button variant="secondary">Back to Main Page</Button>
        </Link>
      </div>

      {/* Order Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop={true}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your order has been successfully placed! Thank you for shopping with us.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Checkout;