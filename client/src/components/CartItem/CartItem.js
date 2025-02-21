import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, Badge, Button, Row, Col, Form } from 'react-bootstrap';
import { getCartItems, fetchCartProducts, updateCartQuantity, updateCartComment, deleteCartItem } from '../../redux/cartReducer';

function CartItem({ product }) {
    const dispatch = useDispatch();

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch(updateCartQuantity({ id: productId, quantity: newQuantity }));
    };

    const handleDeleteItem = (productId) => {
        dispatch(deleteCartItem({ id: productId }));
    };

    const handleTextareaChange = (productId, text) => {
        console.log(`Comment for product ${productId}:`, text);
        dispatch(updateCartComment({ id: productId, comment: text }));
    };

    return (
        <div className="container mt-4">
            <Col key={product.id}>
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
                        <Card.Title className="text-primary fw-bold">{product.name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex align-items-center">
                                <strong className="me-2">Quantity:</strong>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(product.id, parseInt(e.target.value, 10))
                                    }
                                    style={{ width: '80px' }}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Price (Each):</strong>{' '}
                                <Badge bg="info" className="fs-6">${product.price}</Badge>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Total Price:</strong>{' '}
                                <Badge bg="success" className="fs-6">
                                    ${product.price * product.quantity}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Form.Group controlId={`textarea-${product.id}`}>
                                    <Form.Label>Additional Notes:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter any notes or comments..."
                                        onChange={(e) => handleTextareaChange(product.id, e.target.value)}
                                    />
                                </Form.Group>
                            </ListGroup.Item>
                        </ListGroup>
                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="danger" onClick={() => handleDeleteItem(product.id)}>
                                Remove
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
}

export default CartItem;