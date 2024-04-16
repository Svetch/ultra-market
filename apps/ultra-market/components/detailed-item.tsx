import React from 'react';
import Image from 'next/image';
import './../app/global.css';


interface ItemDetail {
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}

interface ItemDetailPageProps {
  item: ItemDetail;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ item }) => {
  return (
    <div className="item-detail-page">
      <div className="item-images">
        {item.images.map((image, index) => (
          <Image key={index} src={image} width={300} height={300} alt={`Image ${index + 1}`} className="item-image" />
          //<img key={index} src={image} alt={`Image ${index + 1}`} className="item-image" />
        ))}
      </div>
      <div className="item-details">
        <h1 className="item-name">{item.name}</h1>
        <p className="item-description">{item.description}</p>
        <p className="item-price">${item.price.toFixed(2)}</p>
        <div className="item-tags">
          {item.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};


/*
interface ItemDetailPageProps {
  itemName: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ itemName, price, description, imageUrl }) => {
  return (
    <div className="item">
        <Image src={imageUrl} width={300} height={300} alt={itemName} />
        <div className="item-details">
            <h2 className="item-name">{itemName}</h2>
            <p className="item-price">{price.toFixed(2)} Ft</p>
            <p className="item-description">{description}</p>
        </div>
    </div>
  );
};
*/


export default ItemDetailPage;
