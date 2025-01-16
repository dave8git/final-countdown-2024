import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostRequest, getPostsById, loadPostByIdRequest, getLoggedUser } from '../../redux/postsReducer';
import { Container, Card, Button, ListGroup, Badge, Spinner } from 'react-bootstrap';

const imageExtensions = ['jpg', 'png', 'gif'];

function FullPost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => getPostsById(state, id));
  const loggedUser = useSelector((state) => getLoggedUser(state));
  
  const [imageUrl, setImageUrl] = useState('');

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

  const handleDelete = async () => {
    try {
      await dispatch(deletePostRequest(id));
      navigate('/');
    } catch (error) {
      alert('Failed to delete the post. Please try again.');
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

          <div className="d-flex justify-content-between mt-3">
            <Link to="/">
              <Button variant="info">Main Page</Button>
            </Link>
            {loggedUser && loggedUser.id === post.author?._id && (
              <>
                <Link to={`/edit-post/${post.id}`}>
                  <Button variant="outline-secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
              </>
            )}
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