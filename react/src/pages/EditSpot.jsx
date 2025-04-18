// src/pages/EditSpot.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/styles.css";

const EditSpot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchSpot = async () => {
      const res = await axios.get("http://localhost:3000/api/spots");
      const spot = res.data.find((s) => s._id === id);
      if (spot) {
        setForm({ name: spot.name, description: spot.description });
      }
    };
    fetchSpot();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/spots/${id}`, form);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Edit Romantic Spot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Spot Name"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
};

export default EditSpot;
