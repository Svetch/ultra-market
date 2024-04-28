import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

interface Product {
    images: string[];
    title: string;
    description: string;
    tags: string[];
    price: number;
    stock: number;
}

interface EditableProductPageProps {
    product: Product;
    onSave: (updatedProduct: Product) => void;
}

const EditableProductPage: React.FC<EditableProductPageProps> = ({ product, onSave }) => {
    const [images, setImages] = useState<string[]>(product.images);
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [tags, setTags] = useState(product.tags);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        const updatedProduct: Product = {
            images,
            title,
            description,
            tags,
            price,
            stock,
        };
        onSave(updatedProduct);
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
                <h3 className="text-lg font-medium text-white">Képek</h3>
                <div className="flex flex-wrap space-x-2">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                            <Image src={image} alt={`Product image ${index + 1}`} layout="fill" objectFit="cover" />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2 text-white"
                />
            </div>

            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-lg font-medium text-white">Cím</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-lg font-medium text-white">Leírás</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    rows={4}
                />
            </div>

            {/* Tags */}
            <div>
                <label htmlFor="tags" className="block text-lg font-medium text-white">Kulcsszavak</label>
                <input
                    id="tags"
                    type="text"
                    value={tags.join(', ')}
                    onChange={(e) => setTags(e.target.value.split(','))}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block text-lg font-medium text-white">Ár</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>

            {/* Stock */}
            <div>
                <label htmlFor="stock" className="block text-lg font-medium text-white">Készlet</label>
                <input
                    id="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>

            {/* Submit button */}
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Változások mentése
            </button>
        </form>
    );
};

export default EditableProductPage;
