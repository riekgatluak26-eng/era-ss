'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', 'ec45243e-76e9-42d9-a0bb-9af8694af0a4');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! Your message has been sent.');
        form.reset();
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="contact-form-card">
      <h3 style={{ fontSize: '1.3rem', color: '#111', marginBottom: 20 }}>
        <i className="fas fa-paper-plane" style={{ color: 'var(--era-primary)', marginRight: 10 }}></i>Send a Message
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input type="text" name="name" placeholder="Full Name *" required />
        <input type="email" name="email" placeholder="Email Address *" required />
        <input type="text" name="subject" placeholder="Subject" />
        <textarea rows={4} name="details" placeholder="Your message here... *" required></textarea>
        <button
          type="submit"
          className="btn-submit"
          disabled={status === 'sending'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            background: status === 'success' ? '#2e7d32' : status === 'error' ? '#c62828' : 'var(--era-primary)',
            transition: 'background 0.3s',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'sending' && 'Sending...'}
          {status === 'success' && '✓ Message Sent!'}
          {status === 'error' && '✕ Failed – Try Again'}
          {status === 'idle' && (
            <>
              <i className="fas fa-paper-plane" style={{ marginRight: 8 }}></i>Send Message
            </>
          )}
        </button>
        {status === 'success' && (
          <p style={{ color: '#2e7d32', textAlign: 'center', margin: 0 }}>{message}</p>
        )}
        {status === 'error' && (
          <p style={{ color: '#c62828', textAlign: 'center', margin: 0 }}>{message}</p>
        )}
      </form>
    </div>
  );
}