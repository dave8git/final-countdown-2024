import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsRequest, searchPostsRequest, getPosts } from '../../redux/postsReducer';
import { useNavigate } from 'react-router-dom';
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
      dispatch(loadProductsRequest());
    }
  };

  return (
    <div className="container">
      {posts && posts.length > 0 ? (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <MiniPost post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default MainPage;
