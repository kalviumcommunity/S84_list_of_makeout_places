import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddSpot from './pages/AddSpot';
import EditSpot from './pages/EditSpot';
import Navbar from './components/Navbar';
import HeroSection from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';

import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="App">
   
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddSpot />} />
          <Route path="/edit/:id" element={<EditSpot />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
