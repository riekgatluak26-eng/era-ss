'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'equity' && password === 'erass2026') {
      // Store authentication flag
      localStorage.setItem('admin-auth', 'true');
      // Redirect to homepage admin
      router.push('/admin/homepage');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        fontFamily: 'Archivo, sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '420px',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              width: '70px',
              height: '70px',
              background: 'var(--era-primary, #C62828)',
              color: '#fff',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '800',
              margin: '0 auto',
            }}
          >
            E
          </div>
          <h1
            style={{
              marginTop: '16px',
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#111',
              letterSpacing: '-0.02em',
            }}
          >
            ERA Admin Login
          </h1>
          <p style={{ color: '#777', fontSize: '0.95rem', marginTop: '4px' }}>
            Sign in to manage the website
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={inputStyle}
          />

          {error && (
            <div
              style={{
                background: '#FEE2E2',
                color: '#B91C1C',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                marginBottom: '16px',
                fontWeight: '500',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'var(--era-primary, #C62828)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#8B0000')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#C62828')}
          >
            Login
          </button>
        </form>

        {/* Footer note */}
        <p
          style={{
            marginTop: '24px',
            fontSize: '0.8rem',
            color: '#999',
          }}
        >
          Protected area – authorised personnel only.
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
  fontSize: '0.9rem',
  color: '#333',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  marginBottom: '20px',
  borderRadius: '8px',
  border: '2px solid #e5e7eb',
  fontSize: '1rem',
  fontFamily: 'Archivo, sans-serif',
  transition: 'border-color 0.3s',
  outline: 'none',
};