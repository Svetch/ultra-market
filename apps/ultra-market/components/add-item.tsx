import React, { useState } from 'react';

interface AddItemPageProps {
  onSubmit: (formData: {
    name: string;
    price: number;
    shortDescription: string;
    description: string;
    images: string[];
    categories: string[];
    stock: number;
  }) => void;
}

const AddItemPage: React.FC<AddItemPageProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [stock, setStock] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      price,
      shortDescription,
      description,
      images,
      categories,
      stock,
    });
  };

  return (
    <div className="max-w-sm mx-auto my-5 p-5 rounded bg-neutral-800">
      <h2>Új termék feltöltése</h2>
      <form onSubmit={handleSubmit}>
        <label>Név:</label>
        <input
          className="w-full rounded mb-5 min-h-10 text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Ár:</label>
        <input
          className="w-full rounded mb-5 min-h-10 text-black"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          required
        />

        <label>Rövid leírás:</label>
        <input
          className="w-full rounded mb-5 min-h-10 text-black"
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />

        <label>Leírás:</label>
        <textarea
          className="w-full rounded-sm mb-5 min-h-32 text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Képek:</label>
        <input
          className="w-full rounded mb-5 min-h-10 text-black"
          type="text"
          onChange={(e) => setImages(e.target.value.split(';'))}
        />

        <label>Tagek:</label>
        <input
          className="w-full rounded mb-5 min-h-10 text-black"
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value.split(','))}
        />

        <label>Készlet:</label>
        <input
          className="w-full rounded mb-5 min-h-10 text-black"
          type="number"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
          required
        />

        <button className="w-full h-12 mt-5 text-white rounded bg-green-600 hover:bg-green-800 transition">
          Feltöltés
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
