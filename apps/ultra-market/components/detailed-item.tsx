import React from 'react';
import Link from 'next/link';


interface ItemDetail {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

interface ItemDetailPageProps {
  item: ItemDetail;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ item }) => {
  const formatter = new Intl.NumberFormat('hu-HU');

  return (
    <div className="item-detail-page">
      <div className="item-details">
        <h1 className="item-name text-xl mb-[20px] font-bold">{item.name}</h1>
        <p className="item-description">{item.description}</p>

        <div className="flex items-center space-x-4">
          <p className="item-price">{formatter.format(item.price)} Ft</p>
          <button /*onClick={goToPrevious}*/ className="bg-blue-500 hover:bg-slate-800 transition duration-300 text-white p-2 rounded-md mr-2" >
            Megrendelés
          </button>
        </div>
        
        
        <div className="pt-10">
          {item.tags.map((tag, index) => (
            <Link key={index} href={`/search?q=${encodeURIComponent(tag)}`} >
              <span className="tag">{tag}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ItemDetailPage;
