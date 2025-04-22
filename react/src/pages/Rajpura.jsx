import React, { useState, useEffect } from 'react';
import {
  FaHeart, FaSearch, FaStar, FaMoon, FaSun, FaLeaf,
  FaEdit, FaTrash, FaUser
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Corrected Link usage
import '../../styles/styles.css';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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

    const timer = setTimeout(() => {
      setIsHeaderVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
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
      fetchSpots();
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

  const showHeader = isHeaderVisible || isHovered;

  return (
    <div className="app">
      {/* HEADER & NAVBAR */}
      <div
        className="header-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`header ${showHeader ? 'show' : 'hide'}`}>
          <h1 className="title">Rajpura Love Nooks 💘</h1>
          <p className="tagline">
            Discover hidden romantic gems across campus for unforgettable moments
          </p>

          <div className="nav-links">
                      <Link to="/">Home</Link>
                      <Link to="/home">Explore</Link>
                      <Link to="/add">Add Spot</Link>
                      <Link to="/choose-campus">Choose Campus</Link>
                    </div>
        </div>
      </div>

      {/* ADD BUTTON */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button className="add-btn" onClick={() => navigate("/add")}>
          ➕ Add New Spot
        </button>
      </div>

      {/* FILTER BY USER */}
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

      {/* SEARCH BAR */}
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

      {/* CATEGORY BUTTONS */}
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

      {/* SPOT CARDS */}
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
    </div>
  );
};

export default Home;
