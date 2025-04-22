import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/chooseCampus.css';

const ChooseCampus = () => {
  return (
    <section className="campus-hero">
      <div className="campus-content">
        <h1>Choose Your Campus</h1>
        <div className="campus-boxes">
          <Link to="/himachal" className="campus-box">Himachal Campus</Link>
          <Link to="/rajpura" className="campus-box">Rajpura Campus</Link>
        </div>
      </div>
    </section>
  );
};

export default ChooseCampus;
