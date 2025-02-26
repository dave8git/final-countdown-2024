import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../config';

const imageExtensions = ['jpg', 'png', 'gif'];

function MiniProduct({ post }) {
  const [imageUrl, setImageUrl] = useState('');

  const loadImage = (imageName, extIndex = 0) => {
    const extension = imageExtensions[extIndex];
    const imagePath = `${IMGS_URL}/${imageName}.${extension}`;

    setImageUrl(imagePath);

    const img = new Image();
    img.onload = () => {};  
    img.onerror = () => {
      if (extIndex < imageExtensions.length - 1) {
        loadImage(imageName, extIndex + 1);
      } else {
        setImageUrl(`${IMGS_URL}/default.jpg`);
      }
    };
    img.src = imagePath;
  };

  useEffect(() => {
    if (post.images) {
      const firstImage = post.images.split(' ')[0]; // Get the first image name
      loadImage(firstImage);
    }
  }, [post]);

  return (
    <Card 
      key={post.id} 
      className="shadow-lg rounded mb-4 d-flex flex-column" 
      style={{ minHeight: '550px' }} // Keeps the card a consistent height
    >
      {imageUrl && (
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={post.name}
          style={{
            width: '100%', // Ensure the image stretches across the entire card width
            height: '250px', // Fixed height
            objectFit: 'cover', // Ensures the image fills the space while maintaining its aspect ratio
          }}
        />
      )}
      <Card.Body className="d-flex flex-column" style={{ flexGrow: 1 }}>
        <Card.Title className="text-primary fw-bold">{post.name}</Card.Title>
        {post.description && (
          <Card.Subtitle className="text-secondary mb-2">{post.description}</Card.Subtitle>
        )}
        
        <Card.Text className="text-muted" style={{ flexGrow: 1 }}>
          {post.content}
        </Card.Text>

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
          <Link to={`/products/${post.id}`}>
            <Button variant="primary">Read More</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MiniProduct;