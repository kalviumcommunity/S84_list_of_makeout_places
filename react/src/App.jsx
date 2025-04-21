import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddSpot from './pages/AddSpot';
import EditSpot from './pages/EditSpot';
import Navbar from './components/Navbar';
import HeroSection from './pages/Landing';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
