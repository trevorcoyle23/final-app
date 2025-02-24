import React from 'react';
import './App.css';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>  
  );
}

export default App;
