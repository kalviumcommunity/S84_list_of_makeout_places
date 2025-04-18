import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch, FaStar, FaMoon, FaSun, FaLeaf, FaEdit, FaTrash } from 'react-icons/fa';
import '../../styles/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { name: "Moonlit Spots", icon: <FaMoon /> },
    { name: "Sunny Hideouts", icon: <FaSun /> },
    { name: "Quiet Gardens", icon: <FaLeaf /> },
    { name: "Starred Favorites", icon: <FaStar /> },
    { name: "All Locations", icon: <FaHeart /> }
  ];

  useEffect(() => {
    fetchSpots();

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

  const fetchSpots = () => {
    axios.get("http://localhost:3000/api/spots")
      .then((res) => setSpots(res.data))
      .catch((err) => console.error("Error fetching spots:", err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/spots/${id}`)
      .then(() => setSpots(spots.filter((spot) => spot._id !== id)))
      .catch((err) => console.error("Error deleting:", err));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredSpots = spots.filter((spot) =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Campus Love Nooks 💘</h1>
        <p className="tagline">
          Discover hidden romantic gems across campus for unforgettable moments
        </p>
      </header>

      {/* Add New Spot Button */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button className="add-btn" onClick={() => navigate("/add")}>
          ➕ Add New Spot
        </button>
      </div>

      {/* Search Bar */}
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

      {/* Category Buttons */}
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

      {/* Spots Grid */}
      <div className="spots-grid">
        {filteredSpots.map((spot) => (
          <div key={spot._id} className="spot-card">
            <div className="card-image-container">
              <img
                src={spot.image || 'https://source.unsplash.com/random/800x600?nature'}
                alt={spot.name}
                className="card-image"
              />
              <div className="card-rating">
                <FaHeart className="heart-icon" />
                {(Math.random() * 4 + 1).toFixed(1)}
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title">{spot.name}</h3>
              <p className="card-description">{spot.description}</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(spot._id)}><FaEdit /> Edit</button>
                <button onClick={() => handleDelete(spot._id)}><FaTrash /> Delete</button>
              </div>
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
