import React, { useState } from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageExtensions = ['jpg', 'png', 'gif'];

function MiniPost({ post }) {
  console.log('post', post);

  const [imageUrl, setImageUrl] = useState('');
  
  const loadImage = (imageName, extIndex = 0) => {
    const extension = imageExtensions[extIndex];
    const imagePath = `http://localhost:8000/public/images/${imageName}.${extension}`;

    setImageUrl(imagePath);

    const img = new Image();
    img.onload = () => {};  
    img.onerror = () => {
      if (extIndex < imageExtensions.length - 1) {
        loadImage(imageName, extIndex + 1);
      } else {
        setImageUrl('http://localhost:8000/public/images/default.jpg');
      }
    };
    img.src = imagePath;
  };

  if (post.image && !imageUrl) {
    loadImage(post.image);
  }

  return (
    <Card key={post.id} className="shadow-lg rounded mb-4" style={{ maxWidth: '500px', margin: 'auto' }}>
      {post.image && imageUrl && (
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={post.name}
          style={{ height: '250px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title className="text-primary fw-bold">{post.name}</Card.Title>
        {post.description && (
          <Card.Subtitle className="text-secondary mb-2">{post.description}</Card.Subtitle>
        )}
        
        <Card.Text className="text-muted">{post.content}</Card.Text>

        {/* List of Specifications */}
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>CPU:</strong> {post.cpu}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>RAM:</strong> {post.ram} GB
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Storage:</strong> {post.storage}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Screen:</strong> {post.screen}
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Price:</strong>
            <Badge bg="success" className="fs-6">${post.price}</Badge>
          </ListGroup.Item>
        </ListGroup>

        <div className="d-flex justify-content-between mt-3">
          <Link to={`/post/${post._id}`}>
            <Button variant="primary">Read More</Button>
          </Link>
          <Link to={`/edit/${post._id}`}>
            <Button variant="outline-secondary">Edit</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MiniPost;
