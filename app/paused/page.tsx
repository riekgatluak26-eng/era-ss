export default function PausedPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0F172A',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'sans-serif' }}>
        ⚠️ Website Paused
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6, opacity: 0.9 }}>
        This website is temporarily paused by the developer.<br />
        It will be removed after <strong>1 week</strong> if the remaining balance is not cleared.
      </p>
      <p style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.8 }}>
        Kindly clear the outstanding balance to restore full access.
      </p>
    </div>
  );
}