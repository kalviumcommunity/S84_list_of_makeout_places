import React, { useState } from 'react';

const AddEntity = ({ onAdd, onUpdate, onDelete, spots }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      onUpdate(editingId, { name, description });
    } else {
      onAdd({ id: Date.now(), name, description });
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

  return (
    <div className="add-entity">
      <h2>{editingId ? 'Edit Romantic Spot' : 'Add a New Romantic Spot'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Spot Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
        ></textarea>
        <button type="submit">{editingId ? 'Update Spot' : 'Add Spot'}</button>
      </form>

      <div className="spots-list">
        {spots.map(spot => (
          <div key={spot.id} className="spot-item">
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <button onClick={() => handleEdit(spot)}>Edit</button>
            <button onClick={() => onDelete(spot.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEntity;
