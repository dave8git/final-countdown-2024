import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FullProduct from './components/FullProduct/FullProduct';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import CartIcon from './components/CartIcon/CartIcon';
import { Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to={"/"}> 
        <h1>Quality Thinkpads</h1>
        </Link>
        <div>
          <Link to={"/cart"}>
            <CartIcon />
          </Link>
        </div>
      </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<FullProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;