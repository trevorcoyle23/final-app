import React from 'react';
import './App.css';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Checkout from './Checkout';
import Cart from './Cart';
import Watches from './Watches';
import Glasses from './Glasses';
import Cologne from './Cologne';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Latest from './Latest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/glasses" element={<Glasses />} />
        <Route path="/cologne" element={<Cologne />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    
  );
}

export default App;