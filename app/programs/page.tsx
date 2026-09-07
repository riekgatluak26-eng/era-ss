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
    title: 'Our Programs',
    subtitle: 'Seven integrated thematic areas driving equitable development across South Sudan.',
    backgroundImage: '/images/equity3.jpg',
  },
  intro: {
    subtitle: 'Programmatic Focus',
    title: 'Seven Thematic Areas',
    description: 'ERA-SS implements a holistic approach that addresses the root causes of vulnerability and inequality. Our programs are interconnected, each reinforcing the other to create sustainable and lasting change.',
  },
  thematicAreas: {
    subtitle: 'Thematic Areas',
    title: 'What We Do',
    items: [
      { icon: 'fas fa-graduation-cap', title: 'Education', text: 'We improve access to quality learning for children and youth, especially girls and those in crisis-affected areas. Activities include teacher training, provision of learning materials, construction of temporary learning spaces, and inclusive education programs.' },
      { icon: 'fas fa-seedling', title: 'Agriculture & Livelihood', text: 'We support communities with climate-smart farming techniques, vocational skills training, and small enterprise development. Our goal is to reduce food insecurity and create sustainable income opportunities.' },
      { icon: 'fas fa-dove', title: 'Peacebuilding & Advocacy', text: 'Through dialogue, reconciliation workshops, and community-led peace initiatives, we foster social cohesion. Our advocacy work amplifies local voices to influence policy at national and international levels.' },
      { icon: 'fas fa-users', title: 'Youth Empowerment', text: 'We equip young people with leadership, digital, and life skills. Our youth networks and innovation hubs provide safe spaces for personal growth and civic engagement.' },
      { icon: 'fas fa-shield-alt', title: 'General Protection', text: 'We prioritize the safety and well-being of vulnerable groups including women, children, the elderly, and persons with disabilities. Our protection activities include case management, psychosocial support, and referrals.' },
      { icon: 'fas fa-venus-mars', title: 'Gender Equality', text: 'We tackle gender-based violence and discrimination by empowering women economically, promoting women’s leadership, and engaging men and boys as allies. Gender equality is integrated across all our programs.' },
      { icon: 'fas fa-tree', title: 'Climate Resilience', text: 'Communities are at the forefront of climate adaptation. We promote conservation, reforestation, sustainable agriculture, and disaster risk reduction to build resilience against floods, droughts, and other climate shocks.' },
    ],
  },
  programApproach: {
    subtitle: 'How We Deliver',
    title: 'Delivering Sustainable Impact',
    description: 'At ERA-SS, our programs are designed to respond to the real needs of communities while creating long-term, sustainable change. We work closely with local leaders, government institutions, community-based organizations, women, youth, and development partners to ensure every intervention is inclusive, locally owned, and evidence-based.',
    items: [
      { icon: 'fas fa-users', title: 'Community-Led', text: 'Communities actively participate in identifying priorities, designing solutions, and implementing projects.' },
      { icon: 'fas fa-chart-bar', title: 'Evidence-Based', text: 'Programs are guided by research, assessments, and continuous monitoring to maximize impact.' },
      { icon: 'fas fa-hand-holding-heart', title: 'Inclusive', text: 'We ensure women, children, youth, persons with disabilities, and other vulnerable groups are fully included.' },
      { icon: 'fas fa-sync-alt', title: 'Sustainable', text: 'We strengthen local capacity so communities can continue benefiting long after projects are completed.' },
    ],
  },
  impact: {
    subtitle: 'Our Impact',
    title: 'Numbers that Speak',
    stats: [
      { value: '2,500+', label: 'Children enrolled in education programs' },
      { value: '1,200', label: 'Farmers trained in climate-smart agriculture' },
      { value: '1,600', label: 'Youth leaders empowered' },
      { value: '200+', label: 'Peace dialogues facilitated' },
    ],
  },
  crossCutting: {
    subtitle: 'Integrated Principles',
    title: 'Cross-Cutting Themes',
    description: 'Every ERA-SS program integrates key principles that strengthen effectiveness and ensure no one is left behind.',
    items: [
      { icon: 'fas fa-venus-mars', title: 'Gender Equality' },
      { icon: 'fas fa-wheelchair', title: 'Disability Inclusion' },
      { icon: 'fas fa-child', title: 'Child Protection' },
      { icon: 'fas fa-leaf', title: 'Environmental Sustainability' },
      { icon: 'fas fa-users', title: 'Community Participation' },
      { icon: 'fas fa-clipboard-check', title: 'Accountability to Affected Populations' },
    ],
  },
  partnerships: {
    subtitle: 'Collaboration',
    title: 'Working Through Partnerships',
    paragraph1: 'ERA-SS collaborates with government institutions, community-based organizations, civil society, local leaders, national and international NGOs, development partners, and the private sector to deliver impactful and sustainable programs across South Sudan.',
    paragraph2: 'We believe that strong partnerships enhance local capacity, promote innovation, and maximize the long-term impact of our interventions.',
    image: '/images/equity4.jpg',
  },
  measuringSuccess: {
    subtitle: 'Accountability',
    title: 'Measuring Our Impact',
    description: 'We continuously monitor, evaluate, and learn from our programs to ensure resources are used effectively and communities experience meaningful, lasting improvements.',
    metrics: [
      { icon: 'fas fa-users', label: 'People reached' },
      { icon: 'fas fa-building', label: 'Communities supported' },
      { icon: 'fas fa-school', label: 'Schools & learning spaces improved' },
      { icon: 'fas fa-tractor', label: 'Farmers & entrepreneurs trained' },
      { icon: 'fas fa-dove', label: 'Peacebuilding initiatives completed' },
      { icon: 'fas fa-female', label: 'Women & youth empowered' },
      { icon: 'fas fa-tree', label: 'Environmental restoration activities' },
      { icon: 'fas fa-comments', label: 'Community feedback & satisfaction' },
    ],
  },
  cta: {
    title: 'Support Our Programs',
    text: 'Your contribution helps us expand these life-changing programs to more communities across South Sudan.',
  },
};

export const dynamic = 'force-dynamic';

export default async function ProgramsPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-programs');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const intro = data.intro;
  const thematicAreas = data.thematicAreas;
  const programApproach = data.programApproach;
  const impact = data.impact;
  const crossCutting = data.crossCutting;
  const partnerships = data.partnerships;
  const measuringSuccess = data.measuringSuccess;
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

      {/* INTRO */}
      <section className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-th-large" style={{ marginRight: 6 }}></i>{intro.subtitle}</p>
          <h2 className="section-title">{intro.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{intro.description}</p>
        </div>
      </section>

      {/* THEMATIC AREAS GRID */}
      <section id="programs-grid" className="section bg-light">
        <div className="container">
          <div className="grid-3" style={{ gap: 30 }}>
            {thematicAreas.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: '32px 24px', textAlign: 'center' }} key={idx}>
                <i className={item.icon} style={{ color: 'var(--era-primary)', fontSize: '2.5rem', marginBottom: 16 }}></i>
                <h3>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM APPROACH */}
      <section id="program-approach" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-lightbulb" style={{ marginRight: 6 }}></i>{programApproach.subtitle}</p>
            <h2 className="section-title">{programApproach.title}</h2>
            <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem' }}>{programApproach.description}</p>
          </div>
          <div className="grid-2" style={{ gap: 24 }}>
            {programApproach.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 24, textAlign: 'center' }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
                <h4>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-chart-bar" style={{ marginRight: 6 }}></i>{impact.subtitle}</p>
          <h2 className="section-title">{impact.title}</h2>
          <div className="grid-4" style={{ marginTop: 40, gap: 24 }}>
            {impact.stats.map((stat: any, idx: number) => (
              <div className="card" style={{ background: '#fef5f5', border: '1px solid rgba(198,40,40,0.1)' }} key={idx}>
                <strong style={{ fontSize: '2rem', color: 'var(--era-primary)' }}>{stat.value}</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-CUTTING THEMES */}
      <section id="cross-cutting" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-layer-group" style={{ marginRight: 6 }}></i>{crossCutting.subtitle}</p>
          <h2 className="section-title">{crossCutting.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 40px', color: 'var(--text-muted)' }}>{crossCutting.description}</p>
          <div className="grid-3" style={{ gap: 24 }}>
            {crossCutting.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 24, textAlign: 'center' }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" className="section bg-light">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="section-subtitle"><i className="fas fa-handshake" style={{ marginRight: 6 }}></i>{partnerships.subtitle}</p>
              <h2 className="section-title">{partnerships.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{partnerships.paragraph1}</p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 14 }}>{partnerships.paragraph2}</p>
              <div style={{ marginTop: 28 }}>
                <Link href="/contact" className="btn btn-primary"><i className="fas fa-handshake" style={{ marginRight: 8 }}></i>Become a Partner</Link>
              </div>
            </div>
            <div>
              <img src={partnerships.image} alt="ERA-SS partnership activities" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* MEASURING SUCCESS */}
      <section id="measuring-success" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-chart-pie" style={{ marginRight: 6 }}></i>{measuringSuccess.subtitle}</p>
          <h2 className="section-title">{measuringSuccess.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{measuringSuccess.description}</p>
          <div className="grid-4" style={{ gap: 20 }}>
            {measuringSuccess.metrics.map((metric: any, idx: number) => (
              <div className="card" style={{ background: '#fef5f5', border: '1px solid rgba(198,40,40,0.1)', padding: 20 }} key={idx}>
                <i className={metric.icon} style={{ color: 'var(--era-primary)', fontSize: '1.8rem', marginBottom: 8 }}></i>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary-dark)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hand-holding-heart" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/contact" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Get Involved</Link>
            <Link href="/support" className="btn btn-outline-light"><i className="fas fa-heart" style={{ marginRight: 8 }}></i>Donate Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}