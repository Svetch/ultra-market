"use client";
import React from 'react';
import EditableProductPage from './../../../components/edit-item';

interface Product {
    images: string[];
    title: string;
    description: string;
    tags: string[];
    price: number;
    stock: number;
}

const ParentComponent: React.FC = () => {
    const mockProduct = {
        images: [
            "/watch_black.jpg",
            "/watch_grey.jpg",
        ],
        title: "Sample Product",
        description: "This is a sample product description.",
        tags: ["tag1", "tag2"],
        price: 4999,
        stock: 10,
    };


    const handleSave = (updatedProduct: Product) => {
        console.log('Product has been saved:', updatedProduct);
    };

    return (
        <div className="container mx-auto bg-neutral-800 rounded-lg p-5 m-10">
            <h1 className="text-3xl font-bold mb-4 text-white">Áru szerkesztése</h1>

            <EditableProductPage product={mockProduct} onSave={handleSave} />
        </div>
    );
};

export default ParentComponent;