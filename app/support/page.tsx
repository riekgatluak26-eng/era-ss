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
    title: 'Support ERA-SS',
    subtitle: 'Every contribution, no matter the size, brings hope and opportunity to communities across South Sudan.',
    backgroundImage: '/images/equity.jpg',
  },
  whySupport: {
    subtitle: 'Your Impact',
    title: 'Why Your Support Matters',
    description: 'Every contribution helps us work alongside communities to create lasting change across South Sudan. Whether supporting education, peacebuilding, livelihoods, or emergency response, your generosity enables vulnerable families to access opportunities, strengthen resilience, and build a brighter future.',
    points: [
      'Expand access to quality education',
      'Strengthen livelihoods and food security',
      'Promote peacebuilding and social cohesion',
      'Improve water, sanitation, and hygiene services',
      'Empower women and young people',
      'Build climate-resilient communities',
    ],
  },
  waysToGive: {
    subtitle: 'Ways to Give',
    title: 'How You Can Help',
    description: 'Choose the option that works best for you. Your generosity fuels our programs across South Sudan.',
    cards: [
      {
        icon: 'fas fa-hand-holding-usd',
        title: 'Financial Donation',
        text: 'Make a one-time or recurring donation via bank transfer or mobile money. Even a small amount can provide school supplies or clean water.',
        buttonLabel: 'See Options',
        buttonLink: '#donation-details',
        borderColor: 'var(--era-primary)',
      },
      {
        icon: 'fas fa-handshake',
        title: 'Strategic Partnership',
        text: 'Join us as a corporate or institutional partner. We design custom collaborations that align with your values and maximize impact.',
        buttonLabel: 'Contact Us',
        buttonLink: '/contact',
        borderColor: 'var(--era-secondary)',
      },
      {
        icon: 'fas fa-box-open',
        title: 'In-Kind & Volunteering',
        text: 'Donate goods, services, or your professional skills. From school materials to IT expertise, everything counts.',
        buttonLabel: 'Get Involved',
        buttonLink: '/contact',
        borderColor: '#555',
      },
    ],
  },
  donationDetails: {
    subtitle: 'Bank & Mobile Money',
    title: 'Make a Direct Deposit',
    description: 'You can transfer your contribution directly to our official bank account or via mobile money. Please include your name and "Donation" as the reference so we can acknowledge your gift.',
    bankInfo: {
      bankName: 'ECOBANK South Sudan',
      accountName: 'Equity Resource Aid',
      accountNumber: 'Official banking details provided upon request',
      swiftCode: 'ECOCSSJB',
    },
    mobileMoney: [
      { provider: 'MTN Mobile Money', number: '+211 927 757 777 (Registered as ERA-SS)' },
      { provider: 'Zain Cash', number: '+211 928 118 089' },
    ],
    image: '/images/equity2.jpg',
    imageCaption: 'Your support transforms lives in South Sudan',
  },
  impact: {
    subtitle: 'Your Donation at Work',
    title: 'What Your Gift Can Do',
    items: [
      { icon: 'fas fa-pencil-alt', text: 'Support learning materials for children' },
      { icon: 'fas fa-seedling', text: 'Strengthen community livelihoods' },
      { icon: 'fas fa-dove', text: 'Facilitate peacebuilding initiatives' },
      { icon: 'fas fa-users', text: 'Expand youth empowerment programs' },
    ],
  },
  transparency: {
    subtitle: 'Trust',
    title: 'Every Donation Makes an Impact',
    description: 'ERA-SS is committed to responsible stewardship of every contribution we receive. We strive to ensure that funds are used efficiently, ethically, and in line with our mission to serve communities across South Sudan.',
    points: [
      'Responsible financial management',
      'Transparent reporting',
      'Regular monitoring of funded activities',
      'Ethical governance',
      'Accountability to donors, partners, and communities',
    ],
  },
  otherWays: {
    subtitle: 'Beyond Giving',
    title: 'Get Involved Beyond Donating',
    description: 'Not everyone can donate money — you can still make a difference.',
    items: [
      { icon: 'fas fa-user-plus', title: 'Become a Volunteer', text: 'Share your skills and time to strengthen our programs.' },
      { icon: 'fas fa-handshake', title: 'Partner With Us', text: 'Collaborate as a business, NGO, donor, or institution.' },
      { icon: 'fas fa-bullhorn', title: 'Fundraise', text: 'Organize fundraising campaigns within your school, workplace, or community.' },
      { icon: 'fas fa-share-alt', title: 'Advocate', text: 'Help raise awareness by sharing our mission and encouraging others to support equitable development in South Sudan.' },
    ],
  },
  cta: {
    title: 'Ready to Make a Difference?',
    text: 'Join the hundreds of supporters who power ERA-SS every day. Together, we can break the cycle of poverty and build a brighter future for all South Sudanese.',
  },
};

export const dynamic = 'force-dynamic';

export default async function SupportPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-support');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const whySupport = data.whySupport;
  const waysToGive = data.waysToGive;
  const donationDetails = data.donationDetails;
  const impact = data.impact;
  const transparency = data.transparency;
  const otherWays = data.otherWays;
  const cta = data.cta;

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${hero.backgroundImage})`, height: '60vh', minHeight: 450, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="slide-overlay" style={{ background: 'rgba(0,0,0,0.5)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{hero.title}</h1>
          <p style={{ color: '#fff', fontSize: '1.2rem', maxWidth: 700, margin: '16px auto 0', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{hero.subtitle}</p>
        </div>
      </section>

      {/* WHY SUPPORT */}
      <section id="why-support" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-heart" style={{ marginRight: 6 }}></i>{whySupport.subtitle}</p>
          <h2 className="section-title">{whySupport.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{whySupport.description}</p>
          <div className="grid-3" style={{ marginTop: 30, gap: 20 }}>
            {whySupport.points.map((point: string, idx: number) => (
              <div className="card" style={{ padding: 24, textAlign: 'left' }} key={idx}>
                <i className="fas fa-check-circle" style={{ color: 'var(--era-primary)', marginRight: 8 }}></i>{point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAYS TO GIVE */}
      <section id="ways-to-give" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-gift" style={{ marginRight: 6 }}></i>{waysToGive.subtitle}</p>
          <h2 className="section-title">{waysToGive.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 40px', color: 'var(--text-muted)', fontSize: '1.05rem' }}>{waysToGive.description}</p>
          <div className="grid-3" style={{ gap: 30 }}>
            {waysToGive.cards.map((card: any, idx: number) => (
              <div className="card" style={{ padding: '32px 24px', textAlign: 'center', borderTop: `4px solid ${card.borderColor}` }} key={idx}>
                <i className={card.icon} style={{ color: card.borderColor, fontSize: '2.5rem', marginBottom: 16 }}></i>
                <h3 style={{ marginBottom: 12 }}>{card.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{card.text}</p>
                {card.buttonLink.startsWith('#') ? (
                  <a href={card.buttonLink} className="btn btn-primary"><i className="fas fa-arrow-down" style={{ marginRight: 8 }}></i>{card.buttonLabel}</a>
                ) : (
                  <Link href={card.buttonLink} className="btn btn-primary"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>{card.buttonLabel}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION DETAILS */}
      <section id="donation-details" className="section bg-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 40 }}>
            <div>
              <p className="section-subtitle"><i className="fas fa-university" style={{ marginRight: 6 }}></i>{donationDetails.subtitle}</p>
              <h2 className="section-title">{donationDetails.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24 }}>{donationDetails.description}</p>
              <div className="card" style={{ background: '#fff', border: '1px solid #eee', padding: '20px 24px' }}>
                <h4 style={{ marginBottom: 14, color: 'var(--era-primary)' }}><i className="fas fa-building-columns" style={{ marginRight: 8 }}></i>Bank Transfer (South Sudan)</h4>
                <p style={{ color: 'var(--text-muted)' }}>
                  <strong>Bank Name:</strong> {donationDetails.bankInfo.bankName}<br />
                  <strong>Account Name:</strong> {donationDetails.bankInfo.accountName}<br />
                  <strong>Account Number:</strong> {donationDetails.bankInfo.accountNumber}<br />
                  <strong>Swift Code:</strong> {donationDetails.bankInfo.swiftCode}
                </p>
              </div>
              <div className="card" style={{ background: '#fff', border: '1px solid #eee', padding: '20px 24px', marginTop: 16 }}>
                <h4 style={{ marginBottom: 14, color: 'var(--era-primary)' }}><i className="fas fa-mobile-alt" style={{ marginRight: 8 }}></i>Mobile Money</h4>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-dark)', lineHeight: 2 }}>
                  {donationDetails.mobileMoney.map((item: any, idx: number) => (
                    <li key={idx}><strong>{item.provider}:</strong> {item.number}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src={donationDetails.image} alt="Community members benefiting from ERA-SS programs" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%' }} loading="lazy" />
              <p style={{ marginTop: 14, color: 'var(--text-muted)', fontStyle: 'italic' }}>{donationDetails.imageCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-chart-line" style={{ marginRight: 6 }}></i>{impact.subtitle}</p>
          <h2 className="section-title">{impact.title}</h2>
          <div className="grid-4" style={{ marginTop: 40, gap: 24 }}>
            {impact.items.map((item: any, idx: number) => (
              <div className="card" style={{ background: '#fef5f5', border: '1px solid rgba(198,40,40,0.1)' }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 8 }}></i>
                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section id="transparency" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-balance-scale" style={{ marginRight: 6 }}></i>{transparency.subtitle}</p>
          <h2 className="section-title">{transparency.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{transparency.description}</p>
          <div className="grid-2" style={{ marginTop: 30, gap: 20 }}>
            {transparency.points.map((point: string, idx: number) => (
              <div className="card" style={{ padding: 24, textAlign: 'left' }} key={idx}>
                <i className="fas fa-check-circle" style={{ color: 'var(--era-primary)', marginRight: 8 }}></i>{point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER WAYS */}
      <section id="other-ways" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-hands-helping" style={{ marginRight: 6 }}></i>{otherWays.subtitle}</p>
          <h2 className="section-title">{otherWays.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{otherWays.description}</p>
          <div className="grid-2" style={{ gap: 24 }}>
            {otherWays.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 24, textAlign: 'left' }} key={idx}>
                <i className={item.icon} style={{ color: 'var(--era-primary)', fontSize: '1.5rem', marginBottom: 8 }}></i>
                <h4>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <Link href="/contact" className="btn btn-primary"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Get Involved</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hands-helping" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <a href="#donation-details" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-arrow-down" style={{ marginRight: 8 }}></i>Donate Now</a>
            <Link href="/contact" className="btn btn-outline-light"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}