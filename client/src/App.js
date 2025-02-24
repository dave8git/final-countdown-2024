import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import FullProduct from './components/FullProduct/FullProduct';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import CartIcon from './components/CartIcon/CartIcon';
import { IMGS_URL } from './config';

const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];

function App() {
  const [logoUrl, setLogoUrl] = useState('');

  const loadImage = (imageName, extIndex = 0) => {
    const extension = imageExtensions[extIndex];
    const imagePath = `${IMGS_URL}${imageName}.${extension}`;  // Use IMGS_URL

    setLogoUrl(imagePath);

    const img = new Image();
    img.onload = () => {};
    img.onerror = () => {
      if (extIndex < imageExtensions.length - 1) {
        loadImage(imageName, extIndex + 1);
      } else {
        setLogoUrl(`${IMGS_URL}default-logo.png`);  // Use IMGS_URL
      }
    };
    img.src = imagePath;
  };

  useEffect(() => {
    console.log('useEffect in app.js');
    loadImage('logo');
  }, []);

  return (
    <Router>
      <div className="container d-flex flex-column min-vh-100">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Quality Thinkpads Logo" 
                style={{ height: '130px', maxWidth: '300px', objectFit: 'contain' }} 
              />
            ) : (
              <h1>Quality Thinkpads</h1>
            )}
          </Link>
          <div>
            <Link to="/cart">
              <CartIcon />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/products/:id" element={<FullProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted py-3 mt-4 border-top">
          © Quality Thinkpads, 2000-2025
        </footer>
      </div>
    </Router>
  );
}

export default App;