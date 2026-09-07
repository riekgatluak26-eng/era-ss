import { createClient } from 'redis';
import Link from 'next/link';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

const defaultData: any = {
  hero: {
    title: 'Our Partners',
    subtitle: 'We are stronger together. Collaboration powers our mission for a more equitable South Sudan.',
    backgroundImage: '/images/equity5.jpg',
  },
  whyPartnerships: {
    subtitle: 'Collaboration',
    title: 'Working Together for Greater Impact',
    paragraph1: 'Sustainable development requires collaboration. ERA-SS believes that meaningful partnerships strengthen communities, expand resources, and create lasting solutions to complex humanitarian and development challenges.',
    paragraph2: 'We work alongside government institutions, civil society organizations, community-based organizations, development agencies, academic institutions, and the private sector to design and implement programs that improve lives across South Sudan.',
  },
  partnerLogos: {
    subtitle: 'Building Strategic Partnerships',
    title: 'Our Valued Partners',
    description: 'ERA-SS is actively cultivating collaborations with organizations that share our vision. Below are some of the institutions we aim to work with as we expand our reach.',
    logos: [
      { src: '/images/partner11.png', alt: 'Partner' },
      { src: '/images/partner2.png', alt: 'Partner' },
      { src: '/images/partner3.png', alt: 'Partner' },
      { src: '/images/partner4.png', alt: 'Partner' },
      { src: '/images/partner5.png', alt: 'Partner' },
      { src: '/images/partner6.png', alt: 'Partner' },
      { src: '/images/partner10.png', alt: 'Partner' },
      { src: '/images/partner8.png', alt: 'Partner' },
    ],
  },
  partnershipOpportunities: {
    subtitle: 'Ways to Partner',
    title: 'Ways to Partner with ERA-SS',
    description: 'Explore the many ways your organization can collaborate with us to drive change.',
    items: [
      { icon: 'fas fa-landmark', title: 'Government Institutions', text: 'Collaborating on national and local development priorities.' },
      { icon: 'fas fa-globe', title: 'International NGOs', text: 'Joint humanitarian and development programming.' },
      { icon: 'fas fa-hand-holding-heart', title: 'UN Agencies', text: 'Supporting coordinated, community-focused initiatives.' },
      { icon: 'fas fa-building', title: 'Corporate Partners', text: 'Investing in social responsibility and sustainable development.' },
      { icon: 'fas fa-hand-holding-usd', title: 'Foundations & Donors', text: 'Providing financial and technical support for impactful programs.' },
      { icon: 'fas fa-users', title: 'Community Organizations', text: 'Strengthening grassroots leadership and local ownership.' },
    ],
  },
  whatWeOffer: {
    subtitle: 'Why Partner',
    title: 'Why Partner with ERA-SS',
    description: 'Our partnerships are built on trust, accountability, and shared impact.',
    points: [
      { icon: 'fas fa-users', text: 'Strong community relationships across South Sudan' },
      { icon: 'fas fa-map-marked-alt', text: 'Local knowledge and contextual expertise' },
      { icon: 'fas fa-file-invoice-dollar', text: 'Transparent financial and program management' },
      { icon: 'fas fa-tasks', text: 'Experienced project implementation teams' },
      { icon: 'fas fa-chart-line', text: 'Regular monitoring, evaluation, and reporting' },
      { icon: 'fas fa-shield-alt', text: 'Commitment to safeguarding, inclusion, and accountability' },
    ],
    additional: [
      'Alignment with the Sustainable Development Goals (SDGs)',
      'Collaborative and long-term partnership approach',
    ],
  },
  cta: {
    title: 'Become a Partner Today',
    text: 'Join our network of change-makers and help us build a more equitable South Sudan. We welcome institutional donors, corporate partners, and foundations.',
  },
};

export const dynamic = 'force-dynamic';

export default async function PartnersPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-partners');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const whyPartnerships = data.whyPartnerships;
  const partnerLogos = data.partnerLogos;
  const partnershipOpportunities = data.partnershipOpportunities;
  const whatWeOffer = data.whatWeOffer;
  const cta = data.cta;

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${hero.backgroundImage})`, height: '60vh', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="slide-overlay" style={{ background: 'rgba(0,0,0,0.45)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{hero.title}</h1>
          <p style={{ color: '#fff', fontSize: '1.2rem', maxWidth: 700, margin: '16px auto 0', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{hero.subtitle}</p>
        </div>
      </section>

      {/* WHY PARTNERSHIPS MATTER */}
      <section id="why-partnerships" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-handshake" style={{ marginRight: 6 }}></i>{whyPartnerships.subtitle}</p>
          <h2 className="section-title">{whyPartnerships.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{whyPartnerships.paragraph1}</p>
          <p style={{ maxWidth: 700, margin: '16px auto 0', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{whyPartnerships.paragraph2}</p>
        </div>
      </section>

      {/* PARTNER LOGOS MARQUEE */}
      <section className="partner-marquee-section" style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <div className="container text-center" style={{ marginBottom: 30 }}>
          <p className="section-subtitle">{partnerLogos.subtitle}</p>
          <h2 className="section-title">{partnerLogos.title}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>{partnerLogos.description}</p>
        </div>
        <div className="partner-marquee-wrapper">
          <div className="partner-track">
            {partnerLogos.logos.map((logo: any, idx: number) => (
              <div className="partner-item" key={idx}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partnerLogos.logos.map((logo: any, idx: number) => (
              <div className="partner-item" key={`dup-${idx}`}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP OPPORTUNITIES */}
      <section id="partnership-opportunities" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <h2 className="section-title">{partnershipOpportunities.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{partnershipOpportunities.description}</p>
          </div>
          <div className="grid-3" style={{ gap: 30 }}>
            {partnershipOpportunities.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: '32px 24px', textAlign: 'center' }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2.5rem', color: 'var(--era-primary)', marginBottom: 16 }}></i>
                <h4>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER PARTNERS */}
      <section id="what-we-offer" className="section bg-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <h2 className="section-title">{whatWeOffer.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{whatWeOffer.description}</p>
          </div>
          <div className="grid-3" style={{ gap: 20 }}>
            {whatWeOffer.points.map((point: any, idx: number) => (
              <div className="card" style={{ background: '#fff', padding: 24, textAlign: 'center' }} key={idx}>
                <i className={point.icon} style={{ fontSize: '1.8rem', color: 'var(--era-primary)', marginBottom: 8 }}></i>
                <p style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{point.text}</p>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 700, margin: '30px auto 0', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {whatWeOffer.additional.map((add: string, idx: number) => (
                <span key={idx}>
                  <i className="fas fa-check-circle" style={{ color: 'var(--era-primary)', marginRight: 8 }}></i>{add}<br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary-dark)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hand-holding-heart" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/contact" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Contact Us</Link>
            <Link href="/support" className="btn btn-outline-light"><i className="fas fa-heart" style={{ marginRight: 8 }}></i>Support Our Work</Link>
          </div>
        </div>
      </section>
    </>
  );
}