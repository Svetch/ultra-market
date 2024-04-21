import React from 'react';
import ItemDetailPage from './../../components/detailed-item';
import ImageSlider from './../../components/image-slider';

const ItemDetailExample: React.FC = () => {
  const images = [
    '/watch_black.jpg',
    '/watch_white.jpg',
    '/watch_grey.jpg',
    // Add more image URLs here
  ];

  const item = {
    name: 'Example Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel justo sit amet est iaculis viverra.',
    price: 2999,
    images: ['/../public/logo.png', '/../public/logo.png', '/../public/logo.png'],
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
  };

  return (
    <div>
      <ImageSlider images={images} />
      <ItemDetailPage item={item} />
    </div>
  );
};

export default ItemDetailExample;
