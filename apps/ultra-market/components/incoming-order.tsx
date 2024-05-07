import React from 'react';

type Product = {
    productId: number;
    productName: string;
    productPrice: number;
    productAmount: number;
};

type OrderProps = {
    orderId: number;
    customerName: string;
    shippingAddress: string;
    customerPhone: string;
    date: string;
    status: string;
    products: Product[];
    updateStatus: (orderId: number, status: string) => void;
};

const Order: React.FC<OrderProps> = ({
    orderId,
    customerName,
    shippingAddress,
    customerPhone,
    date,
    status,
    products,
    updateStatus,
}) => {
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        updateStatus(orderId, newStatus);
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md mb-4">
            <h3 className="text-lg font-semibold">Rendelés azonosítója: {orderId}</h3>
            <p><strong>Vásárló neve:</strong> {customerName}</p>
            <p><strong>Cím:</strong> {shippingAddress}</p>
            <p><strong>Telefon:</strong> {customerPhone}</p>
            <p><strong>Rendelés ideje:</strong> {new Date(date).toLocaleString('hu-HU')}</p>
            <p><strong>Állapot:</strong>
                <select
                value={status}
                onChange={handleStatusChange}
                className="ml-2 border border-gray-300 rounded"
                >
                <option value="Pending">Függőben</option>
                <option value="Packaging">Csomagolás</option>
                <option value="Shipping">Szállítás</option>
                <option value="Delivered">Kézbesített</option>
                <option value="Canceled">Törölve</option>
                </select>
            </p>
            <h4 className="mt-2 mb-1 font-semibold">Termékek:</h4>
            <ul className="list-disc list-inside">
                {products.map((product) => (
                <li key={product.productId}>
                    {product.productName} - ${product.productPrice.toFixed(2)} x {product.productAmount}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Order;
