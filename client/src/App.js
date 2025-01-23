import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FullProduct from './components/FullProduct/FullProduct';
import Cart from './components/Cart/Cart';

function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<FullProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;