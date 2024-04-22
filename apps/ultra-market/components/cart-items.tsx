'use client'
//import React from 'react';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';

const ShoppingCart: React.FC = () => {
    const [cookies] = useCookies(['cart']);
    const cartItems: string[] = cookies.cart || [];
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    /*
     const fetchItemDetails = async (itemId: string) => {
        const response = await fetch(`/api/items/${itemId}`);
        return await response.json();
    };
    */
    
    return (
        <div className="container mx-auto py-8 px-4" suppressHydrationWarning>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

            {isClient ? (
                <div>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((itemId, index) => (
                                <li key={index} className="mb-4 flex items-center">
                                    <div className="flex-grow">
                                        <p>Item ID: {itemId}</p>
                                        {/*
                                            const itemDetails = await fetchItemDetails(itemId);
                                            <p>{itemDetails.name}</p>
                                            <p>{itemDetails.price}</p>
                                            <img src={itemDetails.image} alt={itemDetails.name} />
                                        */}
                                    </div>
                                    <Link href={`/items/${itemId}`} passHref>
                                        <button className="text-blue-500 ml-4">View</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ):(
                <p className="text-gray-500">Kérlek várj...</p>
            )}

            
        </div>
    );
};

export default ShoppingCart;
