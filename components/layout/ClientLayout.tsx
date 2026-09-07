'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith('/admin');
  const isPaused = pathname === '/paused';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (isAdmin && pathname !== '/admin') {
      const auth = localStorage.getItem('admin-auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace('/admin');
      }
    } else if (isAdmin && pathname === '/admin') {
      // On login page, no auth check needed
      setIsAuthenticated(null);
    } else {
      setIsAuthenticated(null);
    }
  }, [pathname, isAdmin, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  // Pause page – no header/footer
  if (isPaused) {
    return <>{children}</>;
  }

  // Admin login page
  if (isAdmin && pathname === '/admin') {
    return <>{children}</>;
  }

  // Admin pages: waiting for auth check
  if (isAdmin && isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading…
      </div>
    );
  }

  // Admin authenticated layout with sidebar
  if (isAdmin && isAuthenticated === true) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '260px',
            background: '#1A1A1A',
            color: '#fff',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: '#C62828',
                color: '#fff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.3rem',
              }}
            >
              E
            </div>
            <div>
              <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#fff', lineHeight: 1 }}>ERA</div>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#F4A825', fontWeight: 700 }}>
                EMPOWERING
              </div>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>
                WITH EQUALITY
              </div>
            </div>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link
              href="/admin/homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: pathname === '/admin/homepage' ? '#F4A825' : 'rgba(255,255,255,0.75)',
                background: pathname === '/admin/homepage' ? 'rgba(198,40,40,0.2)' : 'transparent',
                fontWeight: pathname === '/admin/homepage' ? 700 : 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>🏠</span> Homepage
            </Link>
            {/* Additional admin pages will be added later */}
          </nav>

          <button
            onClick={handleLogout}
            style={{
              marginTop: 'auto',
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(198,40,40,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            🔒 Logout
          </button>
        </aside>

        {/* Main content area */}
        <main style={{ flex: 1, padding: '32px', background: '#F9F9F9', minHeight: '100vh' }}>
          {children}
        </main>
      </div>
    );
  }

  // Public pages
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}