'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu and prevent body scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (target: string) => {
    setActiveSubmenu(activeSubmenu === target ? null : target);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      label: 'About',
      submenu: [
        { href: '/about#background', label: 'Know Who We Are' },
        { href: '/about#vision', label: 'Our Genesis' },
        { href: '/team', label: 'Meet Our Team' },
        { href: '/report', label: 'Our Reports' },
        { href: '/partners', label: 'Partners & Donors' },
      ],
    },
    {
      label: 'Programs',
      submenu: [
        { href: '/programs#education', label: 'Education' },
        { href: '/programs#livelihoods', label: 'Agriculture & Livelihood' },
        { href: '/programs#peacebuilding', label: 'Peacebuilding & Advocacy' },
        { href: '/programs#youth', label: 'Youth Empowerment' },
        { href: '/programs#protection', label: 'General Protection' },
        { href: '/programs#gender', label: 'Gender Equality' },
        { href: '/programs#climate', label: 'Climate Resilience' },
      ],
    },
    { href: '/approach', label: 'Approach' },
    {
      label: 'Coverage',
      submenu: [
        { href: '/coverage#central-equatoria', label: 'Central Equatoria' },
        { href: '/coverage#jonglei', label: 'Jonglei' },
        { href: '/coverage#unity', label: 'Unity' },
        { href: '/coverage#upper-nile', label: 'Upper Nile' },
        { href: '/coverage#lakes', label: 'Lakes' },
        { href: '/coverage#warrap', label: 'Warrap' },
        { href: '/coverage#northern-bahr-el-ghazal', label: 'Northern Bahr el Ghazal' },
        { href: '/coverage#western-bahr-el-ghazal', label: 'Western Bahr el Ghazal' },
        { href: '/coverage#abyei', label: 'Abyei Administrative Area' },
        { href: '/coverage#ruweng', label: 'Ruweng Administrative Area' },
      ],
    },
    { href: '/partners', label: 'Partners' },
    { href: '/faq', label: 'FAQ' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className={`top-bar ${scrolled ? 'hidden' : ''}`}>
        <div className="top-bar-inner left">
          <a href="mailto:info@era-ss.org">
            <i className="fas fa-envelope"></i>
            <span className="label">info@era-ss.org</span>
          </a>
          <a href="tel:+211928118089">
            <i className="fas fa-phone"></i>
            <span className="label">+211 928 118 089</span>
          </a>
        </div>
        <div className="top-bar-inner right">
          <Link href="/career" className="nav-link-top"><i className="fas fa-briefcase"></i> Career</Link>
          <Link href="/reports" className="nav-link-top"><i className="fas fa-file-alt"></i> Reports</Link>
          <Link href="/team" className="nav-link-top"><i className="fas fa-users"></i> Team</Link>
          <Link href="/support" className="donate-btn">Donate</Link>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="logo">
            <img src="/images/erass.jpeg" alt="ERA-SS Logo" />
            <div className="logo-text-wrapper">
              <span className="logo-text">ERA</span>
              <span className="logo-sub">EMPOWERING</span>
              <span className="logo-sub-line2">WITH EQUALITY</span>
            </div>
          </Link>

          <div className="nav-links">
            {navLinks.map((link) =>
              link.submenu ? (
                <div className="dropdown" key={link.label}>
                  <Link href={link.submenu[0].href} className="nav-link">
                    {link.label} ▾
                  </Link>
                  <div className="dropdown-menu">
                    {link.submenu.map((sub) => (
                      <Link key={sub.href} href={sub.href}>{sub.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={`nav-link ${link.label === 'Home' ? 'active' : ''}`}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-logo">
          <img src="/assets/erass.jpeg" alt="ERA-SS Logo" />
          <div className="mobile-logo-text-wrapper">
            <span className="mobile-logo-text">ERA</span>
            <span className="mobile-logo-sub">EMPOWERING</span>
            <span className="mobile-logo-sub-line2">WITH EQUALITY</span>
          </div>
        </div>
        {navLinks.map((link) =>
          link.submenu ? (
            <div key={link.label}>
              <button
                className="mobile-dropdown-btn"
                onClick={() => toggleSubmenu(`mobile-${link.label.toLowerCase()}`)}
              >
                <span>{link.label}</span>
                <span className="dropdown-chevron">▾</span>
              </button>
              <div
                className={`mobile-submenu ${activeSubmenu === `mobile-${link.label.toLowerCase()}` ? 'open' : ''}`}
              >
                {link.submenu.map((sub) => (
                  <Link key={sub.href} href={sub.href} onClick={closeMobileMenu}>
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
              {link.label}
            </Link>
          )
        )}
        <Link href="/support" className="mobile-donate" onClick={closeMobileMenu}>Donate</Link>
      </div>
    </>
  );
}