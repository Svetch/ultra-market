'use client';
import React from 'react';
import AddItemPage from './../../../components/add-item';

const App: React.FC = () => {
  return (
    <div>
      <AddItemPage
        onSubmit={async (data) => {
          console.log('Form submitted:', data);
          const item = await fetch('/api/org/item', {
            body: JSON.stringify(data),
            method: 'post',
          });
          console.log('Item created:', item);
        }}
      />
    </div>
  );
};

export default App;
