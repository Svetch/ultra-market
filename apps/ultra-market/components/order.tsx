import React, { useState } from 'react';


interface AddItemPageProps {
  onSubmit: (formData: FormData) => void;
}

const AddItemPage: React.FC<AddItemPageProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to send to the onSubmit function
    const formData = new FormData();
    formData.append('address', address);
    formData.append('description', description);

    // Pass the form data to the onSubmit function
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <h2>Rendelés</h2>
      <form onSubmit={handleSubmit}>
        <label>Szállítái cím:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>Megjegyzés:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Megrendelem</button>
      </form>
    </div>
  );
};

export default AddItemPage;
