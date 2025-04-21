// pages/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
  
    const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      console.log('Signup data:', formData);
    };
  
    return (
      <div className="signup-page">
        <div className="signup-background"></div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Account</button>

          <div className="login-redirect">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    );
  };
  
export default Signup;
