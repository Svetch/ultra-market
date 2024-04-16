import React from 'react';
import './../app/global.css';


const MainPage: React.FC = () => {
  return (
    <div className="search">
        <input type="text" placeholder="Írd be a keresett terméket" />
        <button>Keresés</button>
    </div>
  );
};

export default MainPage;
