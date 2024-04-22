import Link from 'next/link';
import React from 'react';
import {
  SignedIn,
} from "@clerk/nextjs";

interface FooterProps {
  companyName: string;
}

const Footer: React.FC<FooterProps> = ({ companyName }) => {
  return (
    <footer className="bg-gray-800 p-5">
      <div className="text-center">
        <p>&copy; {companyName} {new Date().getFullYear()}</p>
        <SignedIn>
          <Link href={"/business"} className="underline">Eladó vagyok</Link>
        </SignedIn>
      </div>
    </footer>
  );
};

export default Footer;
