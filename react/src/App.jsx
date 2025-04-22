import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/HimachalHome';
import AddSpot from './pages/AddSpot';
import EditSpot from './pages/EditSpot';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ChooseCampus from './pages/ChooseCampus';
import Rajpura from './pages/Rajpura'
import './App.css';
import HimachalHome from './pages/HimachalHome';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Hide Navbar ONLY on the /home route
  const hideNavbarOnHome =
  location.pathname === '/himachal' || location.pathname === '/rajpura';

  return (
    <div className="App">
      {!hideNavbarOnHome && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/himachal" element={<HimachalHome />} />
        <Route path="/rajpura" element={<Rajpura />} />
        <Route path="/add" element={<AddSpot />} />
        <Route path="/edit/:id" element={<EditSpot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choose-campus" element={<ChooseCampus />} />
      </Routes>
    </div>
  );
}

export default App;
