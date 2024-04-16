import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './../../app/global.css';

interface NavItem {
    title?: string;
    logo?: string;
    link: string;
    alignRight?: boolean;
  }
  
  interface NavbarProps {
    items: NavItem[];
  }
  
  const Navbar: React.FC<NavbarProps> = ({ items }) => {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          {items.map((item, index) => (
            <li key={index} className={`navbar-item ${item.alignRight ? 'align-right' : ''}`}>
              {item.logo ? (
                <Link href="/">
                    <Image src={item.logo} width={128} height={32} alt="Logo" />
                </Link>
              ) : (
                <Link href={item.link} className="navbar-link">{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;