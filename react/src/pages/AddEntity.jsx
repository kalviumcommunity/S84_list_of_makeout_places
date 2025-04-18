import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEntity = () => {
  const [spots, setSpots] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/spots')
      .then(res => setSpots(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId !== null) {
      const res = await axios.put(`http://localhost:3000/api/spots/${editingId}`, { name, description });
      setSpots(spots.map(s => s.id === editingId ? res.data : s));
    } else {
      const res = await axios.post('http://localhost:3000/api/spots', { name, description });
      setSpots([...spots, res.data]);
    }
    setName('');
    setDescription('');
    setEditingId(null);
  };

  const handleEdit = (spot) => {
    setEditingId(spot.id);
    setName(spot.name);
    setDescription(spot.description);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/spots/${id}`);
    setSpots(spots.filter(s => s.id !== id));
  };

  return (
    <div className="add-entity">
      <h2>{editingId ? 'Edit Romantic Spot' : 'Add a New Romantic Spot'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Spot Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">{editingId ? 'Update Spot' : 'Add Spot'}</button>
      </form>

      <div className="spots-list">
        {spots.map(spot => (
          <div key={spot.id} className="spot-item">
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <button onClick={() => handleEdit(spot)}>Edit</button>
            <button onClick={() => handleDelete(spot.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEntity;
