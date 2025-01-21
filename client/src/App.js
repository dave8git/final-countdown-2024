import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import MainPage from './components/MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FullProduct from './components/FullProduct/FullProduct';

function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<FullProduct />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;