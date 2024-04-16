'use client';
import React from 'react';
import Login from '../../../components/user-login';


export default async function Index() {
    const handleLogin = (email: string, password: string) => {
        

        console.log('Logging in with username:', email, 'and password:', password);
      };

    
    return (
        <div>
            <Login onLogin={handleLogin} />
        </div>
    );
}

