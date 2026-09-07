import { createClient } from 'redis';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

const defaultData: any = {
  hero: {
    title: 'Get In Touch',
    subtitle: "We'd love to hear from you. Reach out and we'll respond promptly.",
    backgroundImage: '/images/equity3.jpg',
  },
  contactInfo: {
    title: 'Contact Information',
    responseNote: 'We respond within 2 hours.',
    address: 'Shirikat, Juba, Republic of South Sudan',
    phones: [
      '+211 927 757 777',
      '+211 928 118 089',
      '+211 922 503 888',
      '+211 927 036 669',
    ],
    email: 'info@era-ss.org',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/people/Equity-Resource-Aid-South-Sudan/61590477338666/' },
      { platform: 'Instagram', url: 'https://www.instagram.com/equityresourceaid?igsh=MTRuMzd4bTc2azZmZA==' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/equity-resource-aid-south-sudan-45a908414' },
      { platform: 'WhatsApp', url: 'https://wa.me/211928118089' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps?q=Sherikat,+Juba,+South+Sudan&output=embed',
  },
  formSection: {
    subtitle: 'Send a Message',
    title: "We're Listening",
  },
  cta: {
    title: 'Become a Partner or Volunteer',
    text: "Whether you're an individual, corporation, or institution, there are many ways to get involved. Reach out and let's discuss how you can contribute.",
  },
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-contact-page');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const contactInfo = data.contactInfo;
  const formSection = data.formSection;
  const cta = data.cta;

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${hero.backgroundImage})`, height: '50vh', minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="slide-overlay" style={{ background: 'rgba(0,0,0,0.45)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{hero.title}</h1>
          <p style={{ color: '#fff', fontSize: '1.2rem', maxWidth: 700, margin: '16px auto 0', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{hero.subtitle}</p>
        </div>
      </section>

      {/* CONTACT INFO + MAP */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'stretch', gap: 40 }}>
            <div className="contact-info-card" style={{ height: '100%' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#111', marginBottom: 10 }}>
                <i className="fas fa-address-book" style={{ color: 'var(--era-primary)', marginRight: 10 }}></i>{contactInfo.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 20 }}>{contactInfo.responseNote}</p>

              <div className="contact-info-item">
                <div className="contact-info-icon"><i className="fas fa-location-dot"></i></div>
                <div>
                  <h4>Head Office</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><i className="fas fa-phone"></i></div>
                <div>
                  <h4>Phone Numbers</h4>
                  {contactInfo.phones.map((phone: string, idx: number) => (
                    <p key={idx}><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
                  ))}
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <h4>Email</h4>
                  <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #eee' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 10, color: '#111' }}>Follow &amp; Chat</p>
                {contactInfo.socials.map((social: any, idx: number) => (
                  <a key={idx} href={social.url} target="_blank" className="social-icon-link" aria-label={social.platform} style={social.platform === 'WhatsApp' ? { background: '#25D366' } : {}}>
                    <i className={`fab fa-${social.platform.toLowerCase()}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', minHeight: 300 }}>
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 300 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ERA-SS Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <p className="section-subtitle"><i className="fas fa-paper-plane" style={{ marginRight: 6 }}></i>{formSection.subtitle}</p>
            <h2 className="section-title">{formSection.title}</h2>
          </div>
          <div className="contact-form-card" style={{ maxWidth: 700, margin: '0 auto' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-banner" style={{ background: 'var(--era-primary)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hand-holding-heart" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/support" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-hand-holding-usd" style={{ marginRight: 8 }}></i>Support Our Work</Link>
            <Link href="/career" className="btn btn-outline-light"><i className="fas fa-briefcase" style={{ marginRight: 8 }}></i>Job Opportunities</Link>
          </div>
        </div>
      </section>
    </>
  );
}