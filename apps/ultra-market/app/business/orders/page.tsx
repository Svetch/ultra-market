"use client";
import React, { useState } from 'react';
import Order from './../../../components/incoming-order';

type Product = {
    productId: number;
    productName: string;
    productPrice: number;
    productAmount: number;
};

type OrderData = {
    orderId: number;
    customerName: string;
    shippingAddress: string;
    customerPhone: string;
    date: string;
    status: string;
    products: Product[];
};

// Mock data
const initialOrders: OrderData[] = [
    {
        orderId: 1,
        customerName: 'John Doe',
        shippingAddress: '123 Main St, Anytown, USA',
        customerPhone: '123-456-7890',
        date: '2024-05-07T10:30:00',
        status: 'Pending',
        products: [
        { productId: 101, productName: 'Product A', productPrice: 29.99, productAmount: 2 },
        { productId: 102, productName: 'Product B', productPrice: 14.99, productAmount: 1 },
        ],
    },
    {
        orderId: 2,
        customerName: 'Jane Smith',
        shippingAddress: '456 Oak Ave, Anytown, USA',
        customerPhone: '987-654-3210',
        date: '2024-05-07T11:00:00',
        status: 'Pending',
        products: [
        { productId: 103, productName: 'Product C', productPrice: 49.99, productAmount: 3 },
        { productId: 104, productName: 'Product D', productPrice: 19.99, productAmount: 1 },
        ],
    },
];

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<OrderData[]>(initialOrders);

    const updateStatus = (orderId: number, newStatus: string) => {
        setOrders((prevOrders) =>
        prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
        )
        );
    };

    return (
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Rendelések</h2>
        {orders.map((order) => (
            <Order
            key={order.orderId}
            orderId={order.orderId}
            customerName={order.customerName}
            shippingAddress={order.shippingAddress}
            customerPhone={order.customerPhone}
            date={order.date}
            status={order.status}
            products={order.products}
            updateStatus={updateStatus}
            />
        ))}
        </div>
    );
};

export default OrdersPage;
