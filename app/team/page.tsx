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
    title: 'Our Team',
    subtitle: 'Meet the passionate people behind ERA-SS.',
    backgroundImage: '/images/equity5.jpg',
  },
  intro: {
    subtitle: 'Leadership & Staff',
    title: 'Driven by Purpose, United by Mission',
    description: 'Our diverse team brings together expertise from humanitarian, development, and community-based backgrounds. Together, we are committed to serving the people of South Sudan with integrity and dedication.',
  },
  members: [
    { initials: 'BA', name: 'Bakhita Aluel Deng', role: 'Executive Director', bio: 'Bakhita leads the organization with a vision for inclusive development and a passion for community empowerment.', photo: '' },
    { initials: 'LD', name: 'Liel Deng Liel', role: 'Program Manager', bio: 'Liel oversees program implementation, ensuring projects are responsive to community needs and delivered with quality.', photo: '' },
    { initials: 'MT', name: 'Magar Thomas Dut', role: 'Head of Programs', bio: 'Magar coordinates all programmatic activities, ensuring alignment with ERA-SS\'s strategic goals and donor requirements.', photo: '' },
    { initials: 'DM', name: 'Deng James Manot', role: 'FSL Manager', bio: 'Deng leads food security and livelihoods interventions, supporting communities to build resilient agricultural systems.', photo: '' },
    { initials: 'JA', name: 'James Yel Atiik', role: 'Communications & Information Officer', bio: 'James manages external communications, digital media, and information management to amplify ERA-SS\'s impact.', photo: '' },
    { initials: 'AM', name: 'Amiir Achor Mayar', role: 'Board Member (Ordinary)', bio: 'Amiir brings strategic oversight and governance expertise to the ERA-SS board, guiding the organization\'s long-term direction.', photo: '' },
    { initials: 'AM', name: 'Anyang Ayom Majok', role: 'Board Member (Ordinary)', bio: 'Anyang contributes to the board\'s oversight and policy development, ensuring accountability and good governance.', photo: '' },
  ],
  cta: {
    title: 'Join Our Team',
    text: "We're always looking for passionate individuals to help drive our mission forward.",
  },
};

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-team');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const intro = data.intro;
  const members = data.members;
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

      {/* INTRO */}
      <section className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-users" style={{ marginRight: 6 }}></i>{intro.subtitle}</p>
          <h2 className="section-title">{intro.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{intro.description}</p>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section id="team-members" className="section bg-light">
        <div className="container">
          <div className="grid-3" style={{ gap: 30 }}>
            {members.map((member: any, idx: number) => (
              <div className="card team-card" style={{ textAlign: 'center', padding: '24px 20px' }} key={idx}>
                <div className="team-img-wrapper">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <span className="initials">{member.initials}</span>
                  )}
                </div>
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary-dark)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hands-helping" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/career" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-briefcase" style={{ marginRight: 8 }}></i>View Open Positions</Link>
            <Link href="/contact" className="btn btn-outline-light"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}