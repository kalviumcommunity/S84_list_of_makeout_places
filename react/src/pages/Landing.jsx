import React from 'react';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover the Hidden Romantic Spots on Campus</h1>
        <p>Explore. Add. Share.</p>
        <a href="/signup" className="btn">View Spots</a>
      </div>
    </section>
  );
};

export default Landing;
