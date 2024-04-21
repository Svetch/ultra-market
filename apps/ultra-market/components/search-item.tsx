import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface SearchItemProps {
  id: number;
  itemName: string;
  price: number;
  imageUrl: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ id, itemName, price, imageUrl }) => {
  return (
    <Link href={`/item?id=${id}`} className="search-item hover:bg-slate-800 transition duration-300">
        <Image src={imageUrl} width={150} height={150} alt={itemName} />
        <div className="search-item-details">
            <h3 className="search-item-name">{itemName}</h3>
            <p className="search-item-price">{price.toFixed(2)} Ft</p>
        </div>
    </Link>
  );
};

export default SearchItem;
