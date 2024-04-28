'use client'
//import React from 'react';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
    id: string;
    quantity: number;
}

const ShoppingCart: React.FC = () => {
    const [cookies, setCookie] = useCookies(['cart']);
    const cartItems: string[] = cookies.cart || [];
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const groupAndCountItems = (items: string[]): CartItem[] => {
        const itemMap = new Map<string, number>();

        items.forEach((itemId) => {
            itemMap.set(itemId, (itemMap.get(itemId) || 0) + 1);
        });

        return Array.from(itemMap.entries()).map(([id, quantity]) => ({
            id,
            quantity,
        }));
    };

    const groupedCartItems = groupAndCountItems(cartItems);


    const removeItem = (itemId: string) => {
        const index = cartItems.findIndex((id) => id === itemId);
        if (index !== -1) {
            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1);
            setCookie("cart", updatedCart, { path: '/' });
        }
    };

    /*
     const fetchItemDetails = async (itemId: string) => {
        const response = await fetch(`/api/items/${itemId}`);
        return await response.json();
    };
    */
    
    return (
        <div className="max-w-sm mx-auto my-5 p-5 rounded bg-neutral-800" suppressHydrationWarning>
            <h1 className="text-2xl font-bold mb-4">Kosár tartalma:</h1>

            {isClient ? (
                <div>
                    {groupedCartItems.length === 0 ? (
                        <p>Üres a kosarad.</p>
                    ) : (
                        <ul>
                            {/*{groupedCartItems.map((itemId, index) => (*/}
                            {groupedCartItems.map((cartItem: CartItem) => (
                                <li key={cartItem.id} className="flex justify-between mt-5">
                                    <div className="flex items-start">
                                        {/* Image */}
                                        <div className="relative w-12 h-12">
                                            <Link href={`/item?id=${cartItem.id}`} passHref>
                                                <Image
                                                    src="/watch_black.jpg"
                                                    alt="Description of image"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    className="rounded-sm"
                                                />
                                            </Link>
                                        </div>
                                        {/* Text */}
                                        <div className="flex flex-col ml-4">
                                            <div className="flex space-x-4">
                                                <Link href={`/item?id=${cartItem.id}`} passHref>
                                                    <p>Kék Bicikli (ID: {cartItem.id})</p>
                                                </Link>
                                            </div>
                                            <div className="flex space-x-4">
                                                <p>Mennyiség: {cartItem.quantity}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button onClick={() => removeItem(cartItem.id)} className="bg-red-700 my-2 px-3 rounded-sm">-</button>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    )}

                    <Link href={"/ordering"} passHref>
                        <button className="w-full h-12 mt-5 text-white rounded bg-green-600 hover:bg-green-800 transition">
                            Tovább a rendeléshez
                        </button>
                    </Link>
                </div>
                
            ):(
                <p>Kérlek várj...</p>
            )}
        </div>
        
    );
};

export default ShoppingCart;
