import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface SearchItemProps {
  id: number;
  itemName: string;
  price: number;
  imageUrl: string;
  edit?: boolean;
}

const SearchItem: React.FC<SearchItemProps> = ({ id, itemName, price, imageUrl, edit }) => {

  const hrefValue = edit ? `/business/edit-item?id=${id}` : `/item?id=${id}`;

  return (
    <Link href={hrefValue} className="flex border border-gray-300 rounded-lg overflow-hidden max-w-[75%] mx-auto mb-5 text-gray-300    hover:bg-slate-800 transition duration-300">
        <div style={{width: '250px', position: 'relative'}}>
          <Image
            src={imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            alt={itemName}
          />
        </div>

        
        <div className="search-item-details p-2">
            <h3 className="search-item-name">{itemName}</h3>
            <p className="search-item-price">{price.toFixed(2)} Ft</p>
        </div>
    </Link>
  );
};

export default SearchItem;
