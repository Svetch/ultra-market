import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './../app/global.css';


const MainPage: React.FC = () => {
  return (
    <div className="main-search">
        <div>
        <Image src={"/../public/logo.png"} width={263} height={64} alt="Logo" />
        <br></br>
        <input type="text" placeholder="Írd be a keresett terméket" />
        <Link href="/search">
          <button>Keresés</button>
        </Link>
        </div>
    </div>
  );
};

export default MainPage;
