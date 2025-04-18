import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/styles.css";

const AddSpot = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:3000/api/spots", { name, description })
      .then(() => navigate("/"))
      .catch((err) => console.error("Error adding spot:", err));
  };

  return (
    <div className="form-container">
      <h2>Add New Spot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Spot Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Spot</button>
      </form>
    </div>
  );
};

export default AddSpot;
