'use client';
import React from 'react';
import OrderForm from './../../../components/order';

const App: React.FC = () => {
  const handleSubmit = (formData: FormData) => {
    
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <OrderForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;