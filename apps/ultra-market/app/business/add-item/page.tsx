'use client';
import React from 'react';
import AddItemPage from './../../../components/add-item';

const App: React.FC = () => {
  const handleSubmit = (formData: FormData) => {
    
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <AddItemPage onSubmit={handleSubmit} />
    </div>
  );
};

export default App;