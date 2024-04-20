import React, { useState } from 'react';

interface AddItemPageProps {
  onSubmit: (formData: FormData) => void;
}

const AddItemPage: React.FC<AddItemPageProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [tags, setTags] = useState<string>('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to send to the onSubmit function
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('shortDescription', shortDescription);
    formData.append('description', description);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }
    formData.append('tags', tags);
    formData.append('stock', stock);

    // Pass the form data to the onSubmit function
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <h2>Új termék feltöltése</h2>
      <form onSubmit={handleSubmit}>
        <label>Név:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Ár:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Rövid leírás:</label>
        <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />

        <label>Leírás:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Képek:</label>
        <input type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} />

        <label>Tagek:</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

        <label>Készlet:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

        <button type="submit">Feltöltés</button>
      </form>
    </div>
  );
};

export default AddItemPage;
