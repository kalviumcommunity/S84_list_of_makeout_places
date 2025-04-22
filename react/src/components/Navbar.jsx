import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [visible, setVisible] = useState(true);
    const [hovering, setHovering] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }, []);
  
    const handleMouseEnter = () => {
      setVisible(true);
      setHovering(true);
    };
  
    const handleMouseLeave = () => {
      setHovering(false);
      setVisible(false);
    };
  
    return (
      <div
        className="navbar-hover-zone"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`navbar ${visible ? 'show' : 'hide'}`}>
          <div className="logo">Campus Nooks</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/home">Explore</Link>
            <Link to="/add">Add Spot</Link>
            <Link to="/choose-campus">Choose Campus</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;