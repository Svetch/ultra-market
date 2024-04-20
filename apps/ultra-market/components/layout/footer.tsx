import React from 'react';

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  return (
    <footer className="bg-gray-800 p-5">
      <div className="text-center">
        <p>&copy; {companyName} {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
