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

  // Fetch spots from the backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/spots")
      .then((response) => setSpots(response.data))
      .catch((error) => console.error("Error fetching spots:", error));
  }, []);

  // Delete a spot
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/spots/${id}`)
      .then(() => {
        setSpots(spots.filter(spot => spot._id !== id)); // Remove the deleted spot from the list
      })
      .catch((error) => console.error("Error deleting spot:", error));
  };

  // Navigate to Edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

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
        {spots.filter(spot => spot.name.toLowerCase().includes(searchQuery.toLowerCase())).map(spot => (
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
