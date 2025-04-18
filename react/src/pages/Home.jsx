// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch, FaStar, FaMoon, FaSun, FaLeaf } from 'react-icons/fa';
import '../../styles/styles.css';



const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const mockSpots = Array(6).fill().map((_, i) => ({
    id: i,
    title: `Romantic Spot ${i + 1}`,
    description: "A perfect secluded location for intimate moments",
    image: `https://source.unsplash.com/800x600/?romantic,spot,${i}`
  }));

  const categories = [
    { name: "Moonlit Spots", icon: <FaMoon /> },
    { name: "Sunny Hideouts", icon: <FaSun /> },
    { name: "Quiet Gardens", icon: <FaLeaf /> },
    { name: "Starred Favorites", icon: <FaStar /> },
    { name: "All Locations", icon: <FaHeart /> }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll(".spot-card");
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Campus Love Nooks 💘</h1>
        <p className="tagline">
          Discover hidden romantic gems across campus for unforgettable moments
        </p>
      </header>

      <div className="search-container">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Find your perfect romantic spot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="category-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.name)}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      <div className="spots-grid">
        {mockSpots.map(spot => (
          <div key={spot.id} className="spot-card">
            <div className="card-image-container">
              <img
                src={spot.image}
                alt={spot.title}
                className="card-image"
                onError={(e) => {
                  e.target.src = 'https://source.unsplash.com/random/800x600?nature';
                }}
              />
              <div className="card-rating">
                <FaHeart className="heart-icon" />
                {(Math.random() * 4 + 1).toFixed(1)}
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{spot.title}</h3>
              <p className="card-description">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>
          🔒 All spots are verified for privacy & safety • 
          🌙 Respect quiet hours and campus regulations
        </p>
      </footer>
    </div>
  );
};

export default Home;
