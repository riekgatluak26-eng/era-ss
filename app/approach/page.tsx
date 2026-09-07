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
    title: 'Our Approach',
    subtitle: 'Innovative methods that empower communities and drive sustainable development across South Sudan.',
    backgroundImage: '/images/equity2.jpg',
  },
  intro: {
    subtitle: 'How We Work',
    title: "ERA-SS's Guiding Methodologies",
    description: "At ERA-SS, we believe that lasting change comes from within communities. That's why our approaches are participatory, evidence-based, and designed to build local ownership. We combine capacity building, peer education, meaningful youth engagement, and creative communication to tackle the root causes of inequality and fragility.",
  },
  methodologies: {
    subtitle: 'The Six Methodologies',
    title: 'Our Core Approaches',
    items: [
      { icon: 'fas fa-chart-line', title: 'Capacity Building', text: 'We develop young leaders through comprehensive training in leadership, research, advocacy, and communication. Our workshops and mentorship programmes equip individuals with the skills they need to drive change in their own communities.' },
      { icon: 'fas fa-users', title: 'Peer Education', text: 'Trained peer educators act as trusted messengers within their communities. They provide support, share vital information on health and rights, and create safe spaces where marginalized youth can network and thrive.' },
      { icon: 'fas fa-comments', title: 'Meaningful Youth Participation', text: 'Young people are not just beneficiaries—they are decision-makers. We integrate youth into programmatic design, policy dialogues, and institutional governance, ensuring their voices shape the future of South Sudan.' },
      { icon: 'fas fa-futbol', title: 'Sports & Arts for Development', text: 'We use sports and expressive arts as powerful tools to break down barriers. From football tournaments to drama and music, we create engaging platforms to discuss education, health, gender equality, and peacebuilding.' },
      { icon: 'fas fa-bullhorn', title: 'Media & Communications', text: 'Digital advocacy and social media are central to our work. We train youth in digital storytelling, run radio campaigns, and use online platforms to amplify community voices and influence policy.' },
      { icon: 'fas fa-wave-square', title: 'Youth Mobilization', text: 'Our Youth Mobilization approach channels the energy and creativity of young South Sudanese into collective action. It’s a dynamic network of changemakers driving inclusive development and preparing the next generation of leaders.' },
    ],
  },
  implementationProcess: {
    subtitle: 'How We Deliver',
    title: 'From Community Needs to Lasting Impact',
    description: 'Every ERA-SS project follows a structured process that ensures solutions are community-driven, inclusive, and sustainable.',
    steps: [
      { title: '1. Community Assessment', text: 'We work with communities to identify their priorities, challenges, and opportunities through consultations, surveys, and stakeholder engagement.' },
      { title: '2. Program Design', text: 'Together with local leaders and partners, we develop practical, evidence-based solutions tailored to each community’s needs.' },
      { title: '3. Implementation', text: 'Programs are delivered through trained staff, local volunteers, government institutions, and community partners.' },
      { title: '4. Monitoring & Evaluation', text: 'We continuously track progress, measure results, and gather community feedback to improve program quality.' },
      { title: '5. Sustainability', text: 'We strengthen local capacity so communities can continue benefiting from the program long after project completion.' },
    ],
  },
  principles: {
    subtitle: 'Values',
    title: 'Principles That Guide Every Program',
    description: 'Our work is grounded in principles that ensure every intervention is ethical, inclusive, and focused on long-term impact.',
    items: [
      { icon: 'fas fa-hand-holding-heart', title: 'Community Ownership', text: 'Communities actively shape decisions and lead local solutions.' },
      { icon: 'fas fa-balance-scale', title: 'Inclusion & Equality', text: 'We ensure women, youth, persons with disabilities, and marginalized groups have equal opportunities.' },
      { icon: 'fas fa-handshake', title: 'Partnership', text: 'We collaborate with government institutions, civil society, donors, and local organizations.' },
      { icon: 'fas fa-search-dollar', title: 'Transparency', text: 'We manage resources responsibly and remain accountable to our stakeholders.' },
      { icon: 'fas fa-lightbulb', title: 'Innovation', text: 'We embrace creative and evidence-based approaches to solve complex challenges.' },
      { icon: 'fas fa-sync-alt', title: 'Sustainability', text: 'We build local capacity to create lasting change.' },
    ],
  },
  whyItWorks: {
    subtitle: 'Impact',
    title: 'Creating Sustainable Change',
    description: 'Our approach is designed to strengthen communities rather than create dependency. By investing in local leadership, promoting collaboration, and building resilient systems, ERA-SS helps communities develop the knowledge, skills, and confidence needed to address today’s challenges and prepare for tomorrow’s opportunities.',
    items: [
      { icon: 'fas fa-users-cog', text: 'Community-led planning and implementation' },
      { icon: 'fas fa-handshake', text: 'Strong partnerships at local and national levels' },
      { icon: 'fas fa-people-arrows', text: 'Inclusive participation for all members of society' },
      { icon: 'fas fa-chart-bar', text: 'Evidence-based decision making' },
      { icon: 'fas fa-sync-alt', text: 'Continuous monitoring and learning' },
      { icon: 'fas fa-leaf', text: 'Long-term sustainability and resilience' },
    ],
  },
  cta: {
    title: "Let's Work Together",
    text: 'Our approaches are even stronger when combined with your support. Partner with us, volunteer, or donate to help us scale these methods and reach more communities.',
  },
};

export const dynamic = 'force-dynamic';

export default async function ApproachPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-approach');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const intro = data.intro;
  const methodologies = data.methodologies;
  const implementationProcess = data.implementationProcess;
  const principles = data.principles;
  const whyItWorks = data.whyItWorks;
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
          <p className="section-subtitle"><i className="fas fa-lightbulb" style={{ marginRight: 6 }}></i>{intro.subtitle}</p>
          <h2 className="section-title">{intro.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{intro.description}</p>
        </div>
      </section>

      {/* METHODOLOGIES */}
      <section id="methodologies" className="section bg-light">
        <div className="container">
          <div className="grid-3" style={{ gap: 30 }}>
            {methodologies.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: '32px 24px', textAlign: 'center' }} key={idx}>
                <i className={item.icon} style={{ color: 'var(--era-primary)', fontSize: '2.5rem', marginBottom: 16 }}></i>
                <h3 style={{ color: '#111', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION PROCESS */}
      <section id="implementation-process" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-cogs" style={{ marginRight: 6 }}></i>{implementationProcess.subtitle}</p>
            <h2 className="section-title">{implementationProcess.title}</h2>
            <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{implementationProcess.description}</p>
          </div>
          <div className="grid-2" style={{ gap: 30 }}>
            {implementationProcess.steps.map((step: any, idx: number) => (
              <div className="card" style={{ padding: 24, borderLeft: '5px solid var(--era-primary)' }} key={idx}>
                <h3 style={{ color: 'var(--era-primary)' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDING PRINCIPLES */}
      <section id="principles" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-star" style={{ marginRight: 6 }}></i>{principles.subtitle}</p>
          <h2 className="section-title">{principles.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 40px', color: 'var(--text-muted)' }}>{principles.description}</p>
          <div className="grid-3" style={{ gap: 24 }}>
            {principles.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 24 }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
                <h4>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section id="why-it-works" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-check-circle" style={{ marginRight: 6 }}></i>{whyItWorks.subtitle}</p>
          <h2 className="section-title">{whyItWorks.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{whyItWorks.description}</p>
          <div className="grid-3" style={{ gap: 20 }}>
            {whyItWorks.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 20, background: '#fef5f5', border: '1px solid rgba(198,40,40,0.1)' }} key={idx}>
                <i className={item.icon} style={{ color: 'var(--era-primary)', fontSize: '1.5rem', marginBottom: 8 }}></i>
                <p style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: '#1a1a1a' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hands" style={{ marginRight: 12 }}></i>{cta.title}</h2>
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