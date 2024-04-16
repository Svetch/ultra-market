'use client';
import React, { useState } from 'react';
import './../app/global.css';

interface RegistrationPageProps {
  onRegister: (email: string, password: string) => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
    
        onRegister(email, password);
    };

  return (
    <div className="auth-form">
      <h2>Regisztráció</h2>
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
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
