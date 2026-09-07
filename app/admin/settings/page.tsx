'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin-credentials')
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username || '');
        setPassword(data.password || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please fill in both fields.');
      return;
    }

    const res = await fetch('/api/admin-credentials', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setMessage('Credentials updated successfully.');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Update failed.');
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading settings…</div>;

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Admin Settings</h1>

      <div style={{ maxWidth: '500px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginBottom: 20, fontSize: '1.4rem' }}>Change Login Credentials</h2>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red', marginBottom: 16 }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Save Changes
          </button>
        </form>
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
};