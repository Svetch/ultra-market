'use client';
import React from 'react';
import RegistrationPage from '../../../components/business-register';


export default async function Index() {
    const handleRegister = (email: string, password: string, name: string, vat: string, address: string, phone: string) => {
        console.log('Registering with email:', email, 'and password:', password);
    };

    
    return (
        <div>
            <RegistrationPage onRegister={handleRegister} />
        </div>
    );
}

