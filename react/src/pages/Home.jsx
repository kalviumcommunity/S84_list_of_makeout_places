import React, { useState, useEffect } from 'react';
import {
  FaHeart, FaSearch, FaStar, FaMoon, FaSun, FaLeaf,
  FaEdit, FaTrash, FaUser
} from 'react-icons/fa';
import '../../styles/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
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
    fetchUsers();
    fetchSpots();
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchSpots = async () => {
    try {
      const res = selectedUser
        ? await axios.get(`http://localhost:3000/api/spots`, {
            params: { userId: selectedUser }
          })
        : await axios.get("http://localhost:3000/api/spots");
      setSpots(res.data);
    } catch (err) {
      console.error("Error fetching spots:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/spots/${id}`);
      fetchSpots(); // Refresh the list after delete
    } catch (err) {
      console.error("Error deleting:", err);
    }
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

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button className="add-btn" onClick={() => navigate("/add")}>
          ➕ Add New Spot
        </button>
      </div>

      <div className="filter-user" style={{ textAlign: "center", margin: "10px" }}>
        <label htmlFor="userDropdown"><FaUser /> Filter by User:</label>
        <select
          id="userDropdown"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

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
