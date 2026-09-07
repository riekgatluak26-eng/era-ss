import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/images/erass.jpeg" alt="ERA-SS Logo" className="footer-logo-img" />
              <div className="footer-brand-wrapper">
                <span className="footer-brand-name">ERA</span>
                <span className="footer-brand-sub">EMPOWERING</span>
                <span className="footer-brand-sub-line2">WITH EQUALITY</span>
              </div>
            </div>
            <p className="footer-description">
              Registered national NGO, Republic of South Sudan. Committed to equitable development, peace, and resilience.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/people/Equity-Resource-Aid-South-Sudan/61590477338666/" target="_blank" className="footer-social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/equityresourceaid?igsh=MTRuMzd4bTc2azZmZA==" target="_blank" className="footer-social-icon"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/equity-resource-aid-south-sudan-45a908414" target="_blank" className="footer-social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://wa.me/211928118089" target="_blank" className="footer-social-icon"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">Who We Are</Link></li>
              <li><Link href="/programs">Programs</Link></li>
              <li><Link href="/approach">Our Approach</Link></li>
              <li><Link href="/coverage">Coverage</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Programs</h4>
            <ul className="footer-links">
              <li><Link href="/programs#education">Education</Link></li>
              <li><Link href="/programs#livelihoods">Livelihoods</Link></li>
              <li><Link href="/programs#peacebuilding">Peacebuilding</Link></li>
              <li><Link href="/programs#youth">Youth Empowerment</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact-info">
              <li><i className="fas fa-location-dot" style={{ width: '18px', color: 'var(--era-primary)' }}></i> Shirikat, Juba, South Sudan</li>
              <li><i className="fas fa-phone" style={{ width: '18px', color: 'var(--era-primary)' }}></i> +211 928 118 089</li>
              <li><i className="fas fa-phone" style={{ width: '18px', color: 'var(--era-primary)' }}></i> +211 927 757 777</li>
              <li><i className="fas fa-envelope" style={{ width: '18px', color: 'var(--era-primary)' }}></i> <a href="mailto:info@era-ss.org">info@era-ss.org</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Equity Resource Aid – South Sudan (ERA-SS). All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a> |
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}