import React from 'react';
import ItemDetailPage from './../../components/detailed-item';

const ItemDetailExample: React.FC = () => {
  const item = {
    name: 'Example Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel justo sit amet est iaculis viverra.',
    price: 29.99,
    images: ['/../public/logo.png', '/../public/logo.png', '/../public/logo.png'],
    tags: ['Tag1', 'Tag2', 'Tag3'],
  };

  return (
    <div>
      <ItemDetailPage item={item} />
    </div>
  );
};

export default ItemDetailExample;
