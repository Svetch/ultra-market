'use client'
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "../public/logo.png";


const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="main-search">
        <div>
        <Image src={Logo} width={263} height={64} alt="Logo" />
        <br></br>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Írd be a keresett terméket"
        />
        <Link href={`/search/${encodeURIComponent(searchQuery)}`}>
          <button>Keresés</button>
        </Link>
        </div>
    </div>
  );
};

export default MainPage;