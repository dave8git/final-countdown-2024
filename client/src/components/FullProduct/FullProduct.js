import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';
import { getPostsById, loadPostByIdRequest } from '../../redux/postsReducer';
import { Container, Card, Button, ListGroup, Badge, Spinner, Form } from 'react-bootstrap';

const imageExtensions = ['jpg', 'png', 'gif'];

function FullPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => getPostsById(state, id));

  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!post) {
      dispatch(loadPostByIdRequest(id));
    }
  }, [dispatch, id, post]);

  useEffect(() => {
    if (post?.image) {
      loadImage(post.image);
    }
  }, [post]);

  const loadImage = (imageName, extIndex = 0) => {
    const extension = imageExtensions[extIndex];
    const imagePath = `http://localhost:8000/public/images/${imageName}.${extension}`;

    setImageUrl(imagePath);

    const img = new Image();
    img.onerror = () => {
      if (extIndex < imageExtensions.length - 1) {
        loadImage(imageName, extIndex + 1);
      } else {
        setImageUrl('http://localhost:8000/public/images/default.jpg');
      }
    };
    img.src = imagePath;
  };

  const handleAddToCart = () => {
    if(post && quantity > 0) {
      dispatch(addToCart({ id: post.id, quantity}));
      console.log(`Added ${quantity} of "${post.name}" to the cart.`);
    }
  };

  return post ? (
    <Container className="mt-4">
      <Card className="shadow-lg rounded" style={{ maxWidth: '600px', margin: 'auto' }}>
        {post.image && imageUrl && (
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={post.name}
            style={{ height: '300px', objectFit: 'cover' }}
          />
        )}
        <Card.Body>
          <Card.Title className="text-primary fw-bold">{post.name}</Card.Title>
          {post.description && (
            <Card.Subtitle className="text-secondary mb-2">{post.description}</Card.Subtitle>
          )}
          <Card.Text className="text-muted">{post.content}</Card.Text>

          <ListGroup variant="flush">
            <ListGroup.Item><strong>CPU:</strong> {post.cpu}</ListGroup.Item>
            <ListGroup.Item><strong>RAM:</strong> {post.ram} GB</ListGroup.Item>
            <ListGroup.Item><strong>Storage:</strong> {post.storage} GB</ListGroup.Item>
            <ListGroup.Item><strong>Screen:</strong> {post.screen} inches</ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Price:</strong>
              <Badge bg="success" className="fs-6">${post.price}</Badge>
            </ListGroup.Item>
          </ListGroup>

          <div className="mt-3">
            <Form.Group className="mb-3" controlId="quantityInput">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
            <div className="mt-3 d-flex gap-3">
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Link to="/">
                <Button variant="info">Main Page</Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Container className="mt-4 text-center">
      <Spinner animation="border" variant="primary" />
      <p>Loading...</p>
    </Container>
  );
}

export default FullPost;
