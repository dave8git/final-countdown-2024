import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartReducer';
import { getPostsById, loadPostByIdRequest } from '../../redux/postsReducer';
import { Container, Card, Button, ListGroup, Badge, Spinner, Form, Carousel } from 'react-bootstrap';

const imageExtensions = ['jpg', 'png', 'gif'];

function FullPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => getPostsById(state, id));

  const [imageUrls, setImageUrls] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!post) {
      dispatch(loadPostByIdRequest(id));
    }
  }, [dispatch, id, post]);

  useEffect(() => {
    if (post?.images) {
      const imageArray = post.images.split(' ');
      preloadImages(imageArray);
    }
  }, [post]);

  const preloadImages = async (imageArray) => {
    const validImageUrls = await Promise.all(
      imageArray.map((imageName) => checkValidImage(imageName))
    );
    setImageUrls(validImageUrls.filter((url) => url));
  };

  const checkValidImage = (imageName) => {
    return new Promise((resolve) => {
      let imageFound = false;

      const tryExtension = (index) => {
        if (index >= imageExtensions.length) {
          resolve('http://localhost:8000/public/images/default.jpg');
          return;
        }

        const testPath = `http://localhost:8000/public/images/${imageName}.${imageExtensions[index]}`;
        const img = new Image();
        img.onload = () => {
          if (!imageFound) {
            imageFound = true;
            resolve(testPath);
          }
        };
        img.onerror = () => tryExtension(index + 1);
        img.src = testPath;
      };

      tryExtension(0);
    });
  };

  const handleAddToCart = () => {
    if (post && quantity > 0) {
      dispatch(addToCart({ ...post, quantity }));
      console.log(`Added ${quantity} of "${post.name}" to the cart.`);
    }
  };

  return post ? (
    <Container className="mt-4">
      <Card className="shadow-lg rounded" style={{ maxWidth: '600px', margin: 'auto' }}>
        {imageUrls.length > 0 && (
          <Carousel>
            {imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`Slide ${index + 1}`}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
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