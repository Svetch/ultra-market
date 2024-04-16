import React from 'react';
import './../../app/global.css';

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {companyName} {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
