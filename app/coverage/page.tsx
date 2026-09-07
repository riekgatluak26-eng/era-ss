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
    title: 'Where We Work',
    subtitle: 'Operating across all 10 states of South Sudan, reaching the most vulnerable communities.',
    backgroundImage: '/images/equity1.jpg',
  },
  coverageDetails: {
    subtitle: 'Coverage',
    title: 'Working Nationwide',
    paragraph1: 'We operate nation-wide, collaborating with community and youth-led NGOs, networks and changemakers as well as working with the government\'s existing structures and systems to reach the most vulnerable and marginalized groups.',
    paragraph2: 'Our work contributes towards the Sustainable Development Goals (2, 3, 4, 5, 6, 13, and 16), the South Sudan Growth Development Strategy and South Sudan Vision 2030.',
    stats: [
      { value: '8', label: 'States' },
      { value: '7', label: 'SDGs' },
      { value: 'Nationwide', label: 'Reach' },
    ],
    image: '/images/equity1.jpg',
  },
  presence: {
    subtitle: 'Our Footprint',
    title: 'Our Presence Across South Sudan',
    description: 'ERA-SS works in partnership with local communities, civil society organizations, and government institutions across all 8 states. Our programs are tailored to the unique needs and priorities of each state, ensuring locally driven and sustainable solutions.',
    states: [
      { name: 'Central Equatoria', focus: 'Governance, Education, Youth Empowerment' },
      { name: 'Jonglei', focus: 'Humanitarian Assistance, Child Protection' },
      { name: 'Unity', focus: 'Peacebuilding, Recovery, Livelihoods' },
      { name: 'Upper Nile', focus: 'Emergency Response, Health, WASH' },
      { name: 'Lakes', focus: 'Community Development, Education' },
      { name: 'Warrap', focus: 'Youth Empowerment, Gender Equality' },
      { name: 'Northern Bahr el Ghazal', focus: 'Food Security, Education' },
      { name: 'Western Bahr el Ghazal', focus: 'Livelihoods, Community Resilience' },
    ],
  },
  howWeWork: {
    subtitle: 'Implementation Approach',
    title: 'Delivering Impact Through Local Partnerships',
    description: 'ERA-SS believes sustainable development begins with communities. We work closely with local leaders, community-based organizations, youth groups, women\'s associations, government institutions, and development partners to design and implement programs that respond to local needs.',
    items: [
      { icon: 'fas fa-users', title: 'Community Participation & Ownership' },
      { icon: 'fas fa-chart-bar', title: 'Evidence-Based Planning' },
      { icon: 'fas fa-balance-scale', title: 'Inclusive & Equitable Service Delivery' },
      { icon: 'fas fa-graduation-cap', title: 'Capacity Strengthening for Local Institutions' },
      { icon: 'fas fa-sync-alt', title: 'Sustainable & Long-Term Development' },
    ],
  },
  programReach: {
    subtitle: 'Our Scale',
    title: 'Expanding Our Reach',
    stats: [
      { value: '8', label: 'States Covered' },
      { value: '34+', label: 'Counties & Communities' },
      { value: 'Multiple', label: 'Development Sectors' },
      { value: 'Thousands', label: 'People Reached' },
      { value: 'National', label: 'Local Partnerships' },
      { value: 'fas fa-users', label: 'Community‑Led Implementation' },
    ],
    note: 'Figures are indicative and updated as our monitoring data grows.',
  },
  cta: {
    title: 'Ready to Make a Difference?',
    text: 'Join forces with ERA-SS to extend our reach and deepen our impact in every corner of South Sudan.',
  },
};

export const dynamic = 'force-dynamic';

export default async function CoveragePage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-coverage');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const coverageDetails = data.coverageDetails;
  const presence = data.presence;
  const howWeWork = data.howWeWork;
  const programReach = data.programReach;
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

      {/* COVERAGE DETAILS */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="coverage-image-wrapper">
              <img src={coverageDetails.image} alt="South Sudan community members" loading="lazy" />
            </div>
            <div>
              <p className="section-subtitle"><i className="fas fa-globe" style={{ marginRight: 6 }}></i>{coverageDetails.subtitle}</p>
              <h2 className="section-title">{coverageDetails.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>{coverageDetails.paragraph1}</p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>{coverageDetails.paragraph2}</p>
              <div className="coverage-stats">
                {coverageDetails.stats.map((stat: any, idx: number) => (
                  <div className="coverage-stat" key={idx}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENCE BY STATE */}
      <section id="presence" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-map-pin" style={{ marginRight: 6 }}></i>{presence.subtitle}</p>
          <h2 className="section-title">{presence.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 40px', color: 'var(--text-muted)' }}>{presence.description}</p>
          <div className="grid-3" style={{ gap: 24 }}>
            {presence.states.map((state: any, idx: number) => (
              <div className="card" style={{ padding: '24px 20px', textAlign: 'left', borderTop: '4px solid var(--era-primary)' }} key={idx}>
                <h4 style={{ color: 'var(--era-primary)', marginBottom: 12 }}><i className="fas fa-map-marker-alt" style={{ marginRight: 8 }}></i>{state.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{state.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how-we-work" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-cogs" style={{ marginRight: 6 }}></i>{howWeWork.subtitle}</p>
            <h2 className="section-title">{howWeWork.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{howWeWork.description}</p>
          </div>
          <div className="grid-3" style={{ gap: 24 }}>
            {howWeWork.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 24, textAlign: 'center' }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM REACH */}
      <section id="program-reach" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-chart-line" style={{ marginRight: 6 }}></i>{programReach.subtitle}</p>
          <h2 className="section-title">{programReach.title}</h2>
          <div className="grid-4" style={{ marginTop: 40, gap: 24 }}>
            {programReach.stats.map((stat: any, idx: number) => (
              <div className="card" style={{ background: '#fef5f5', border: '1px solid rgba(198,40,40,0.1)' }} key={idx}>
                <strong style={{ fontSize: '1.5rem', color: 'var(--era-primary)' }}>{stat.value}</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>{stat.label}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 30, color: 'var(--text-muted)', fontStyle: 'italic' }}>{programReach.note}</p>
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