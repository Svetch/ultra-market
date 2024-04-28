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

    onSubmit(formData);
  };

  return (
    <div className="max-w-sm mx-auto my-5 p-5 rounded bg-neutral-800">
      <h2>Új termék feltöltése</h2>
      <form onSubmit={handleSubmit}>
        <label>Név:</label>
        <input className="w-full rounded mb-5 min-h-10 text-black" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Ár:</label>
        <input className="w-full rounded mb-5 min-h-10 text-black" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Rövid leírás:</label>
        <input className="w-full rounded mb-5 min-h-10 text-black" type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />

        <label>Leírás:</label>
        <textarea className="w-full rounded-sm mb-5 min-h-32 text-black" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Képek:</label>
        <input className="w-full mb-5 min-h-10" type="file" accept="image/*" multiple onChange={(e) => setImages(e.target.files)} />

        <label>Tagek:</label>
        <input className="w-full rounded mb-5 min-h-10 text-black" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

        <label>Készlet:</label>
        <input className="w-full rounded mb-5 min-h-10 text-black" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

        <button className="w-full h-12 mt-5 text-white rounded bg-green-600 hover:bg-green-800 transition">Feltöltés</button>
      </form>
    </div>
  );
};

export default AddItemPage;
