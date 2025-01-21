import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsRequest, searchPostsRequest, getPosts } from '../../redux/postsReducer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import MiniPost from '../MiniProduct/MiniProduct';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(getPosts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);
  
  const user = useSelector(state => state.posts.user);
  console.log('user', user);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      dispatch(searchPostsRequest(searchQuery));
    } else {
      dispatch(loadProductsRequest()); // Reset to all posts if search is cleared
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Posts</h1>
        <div>
          {/* TODO cart icon */}
        </div>
      </div>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" variant="primary" className="mt-2">
          Search
        </Button>
      </Form>
      {posts && posts.length > 0 ? (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <MiniPost post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default MainPage;
