'use client';
import React, { useState } from 'react';
import './../app/global.css';

interface RegistrationPageProps {
    onRegister: (
        email: string, 
        password: string,
        name: string,
        vat: string,
        address: string,
        phone: string,
    ) => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [vat, setVat] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = () => {
        onRegister(email, password, name, vat, address, phone);
    };

  return (
    <div className="auth-form">
      <h2>Eladói regisztráció</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Név</label>
          <input
            type="text"
            id="name"
            value={password}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="vat">VAT</label>
          <input
            type="text"
            id="vat"
            value={password}
            onChange={(e) => setVat(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Cím</label>
          <input
            type="text"
            id="address"
            value={password}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Telefon</label>
          <input
            type="text"
            id="phone"
            value={password}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
};

export default RegistrationPage;