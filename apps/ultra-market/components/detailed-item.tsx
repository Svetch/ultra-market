import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import { useCartStore } from './cart';

interface ItemDetail {
  name: string;
  description: string;
  price: number;
  categories: { id: number; name: string }[];
  id: number;
  images: string[];
}

interface ItemDetailPageProps {
  item: ItemDetail;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ item }) => {
  const formatter = new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
  });
  const { addToCart, openCart } = useCartStore();

  const handleOrder = () => {
    addToCart(item);
    toast('Sikeresen hozzáadtál egy terméket a korárhoz', {
      action: {
        label: 'Kosárhoz',
        onClick: openCart,
      },
      duration: 3000,
    });
  };

  return (
    <div className="item-detail-page">
      <div className="item-details">
        <h1 className="item-name text-xl mb-[20px] font-bold">{item.name}</h1>
        <p className="item-description">{item.description}</p>

        <div className="flex items-center space-x-4">
          <p className="item-price">{formatter.format(item.price)}</p>
          <button
            onClick={handleOrder}
            className="bg-green-600 hover:bg-green-800 transition duration-300 text-white p-2 rounded-md mr-2"
          >
            Megrendelés
          </button>
        </div>

        <div className="pt-10">
          {item.categories.map((c, index) => (
            <Link
              key={index}
              href={`/search?category=${encodeURIComponent(c.id)}`}
            >
              <span className="p-2 mx-1 rounded-sm bg-green-800">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
