import React from 'react';
import Image from 'next/image';


interface SearchItemProps {
  itemName: string;
  price: number;
  imageUrl: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ itemName, price, imageUrl }) => {
  return (
    <div className="search-item">
        <Image src={imageUrl} width={150} height={150} alt={itemName} />
        <div className="search-item-details">
            <h3 className="search-item-name">{itemName}</h3>
            <p className="search-item-price">{price.toFixed(2)} Ft</p>
        </div>
    </div>
  );
};

export default SearchItem;
