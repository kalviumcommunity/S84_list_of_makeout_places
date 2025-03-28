import React, { useState } from 'react';

const AddEntity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Spot:', { name, description });
  };

  return (
    <div className="add-entity">
      <h2>Add a New Romantic Spot</h2>
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
        <button type="submit">Add Spot</button>
      </form>
    </div>
  );
};

export default AddEntity;
