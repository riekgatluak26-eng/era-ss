import { createClient } from 'redis';
import Link from 'next/link';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

// Default data exactly as the original About page
const defaultData: any = {
  hero: {
    title: 'About ERA-SS',
    subtitle: 'Our story, vision, and commitment to building an equitable South Sudan.',
    backgroundImage: '/images/equity.jpg',
  },
  history: {
    subtitle: 'Our Story',
    title: 'Who We Are & How We Began',
    paragraph1: 'Equity Resource Aid (ERA) is a non-profit national non-governmental organization founded and registered with the Relief and Rehabilitation Commission (RRC) of the Republic of South Sudan on 10th June 2026. We were established by a group of passionate South Sudanese professionals who saw the urgent need for a locally-led organization that could respond to the complex challenges facing our communities.',
    paragraph2: 'ERA was born out of a vision to create a platform where the voices of the most vulnerable are heard, and where resources are distributed equitably. We believe that lasting change comes from within communities, and our work is rooted in participatory approaches that empower local actors.',
    image: '/images/equity1.jpg',
  },
  visionMission: {
    visionTitle: 'Our Vision',
    visionText: 'Creating enabling opportunities for all people to achieve their needs, actively embracing continual social inclusion, change, and justice to take center stage in achieving optimum human development.',
    missionTitle: 'Our Mission',
    missionText: 'All citizens, regardless of their backgrounds, working together, uphold the peace and stability, and take the lead in fulfilling their talents and skills for a progressive change.',
  },
  coreValues: {
    subtitle: 'What Drives Us',
    title: 'Our Core Values',
    values: [
      { icon: 'fas fa-hand-holding-heart', title: 'Dignity', text: 'Every person deserves respect and inherent worth.' },
      { icon: 'fas fa-globe-africa', title: 'Respect for All', text: 'Honouring diversity and uniqueness.' },
      { icon: 'fas fa-balance-scale', title: 'Equality', text: 'Fair opportunities for everyone.' },
      { icon: 'fas fa-clipboard-check', title: 'Accountability', text: 'Transparent and responsible stewardship.' },
      { icon: 'fas fa-fire', title: 'Dedication', text: 'Unwavering commitment to our mission.' },
      { icon: 'fas fa-wheelchair', title: 'Inclusion', text: 'Leaving no one behind.' },
    ],
  },
  genesis: {
    subtitle: 'Our Genesis',
    title: 'Founded with Purpose',
    description: 'ERA was established to fill a critical gap in locally-led development. Our foundational aims and strategic objectives guide everything we do.',
    aimsTitle: '9 Foundational Aims',
    objectivesTitle: '10 Strategic Objectives',
    aims: [
      'To empower, educate, and inspire children and all citizens for the importance of being responsible patriots.',
      'To ensure that these people occupy the center stage in the development of South Sudan.',
      'To prepare the mindsets of the people in line with national cohesion.',
      'To unify all regions and enhance the values of national integration.',
      'To serve as an entity for both inclusion and tolerance in the nation-building process.',
      'To complement the government\'s efforts in making South Sudan a better place for all citizens.',
      'To ensure multi-dimensional mobilizations for the nation\'s building and sustenance.',
      'To promote the relevance of non-violence to children and young people across the country.',
      'To raise awareness about environmental safety, gender-based violence, and good accessibility to health education.',
    ],
    objectives: [
      'To develop mutual relation and brotherhood feelings in South Sudanese communities through peace building and reconciliation.',
      'To launch awareness programs in peace building, education, health, community policing, hygiene & sanitation, civic education, human rights, gender and children\'s issues.',
      'To work for creative youth activities and sports development for peace building and better security.',
      'To carry out water, sanitation and hygiene programs among local populations especially those in need.',
      'To cooperate in managing water schemes in its working areas.',
      'To promote community well-being & reassurance through community security & community policing programs.',
      'To enhance well-being of indigenous people by operating result-oriented programs for poverty alleviation.',
      'To repair and maintain feeder roads in coordination with local structures of underserved communities.',
      'To launch appropriate programs for women, children, elderly, helpless and disabled persons.',
      'To implement, promote and support environmental conservation, food security, and economic stability.',
    ],
  },
  whyEra: {
    subtitle: 'The Context',
    title: 'Why ERA Exists',
    description: 'South Sudan continues to face immense challenges — poverty, conflict, food insecurity, climate shocks, limited education, gender inequality, and weak healthcare systems. ERA-SS was founded to ensure that the voices of communities are heard and that resources are distributed equitably.',
    challenges: [
      { icon: 'fas fa-fist-raised', title: 'Conflict & Displacement', text: 'Ongoing instability has displaced millions, fracturing communities and disrupting lives across the nation.' },
      { icon: 'fas fa-utensils', title: 'Food Insecurity & Malnutrition', text: 'Millions face acute hunger due to conflict, droughts, floods, and disrupted agricultural cycles.' },
      { icon: 'fas fa-book', title: 'Limited Access to Education', text: 'Many children and youth remain out of school, lacking quality learning opportunities and infrastructure.' },
      { icon: 'fas fa-heartbeat', title: 'Poor Healthcare & WASH', text: 'Weak health systems and inadequate water, sanitation, and hygiene facilities endanger lives daily.' },
      { icon: 'fas fa-venus-mars', title: 'Gender Inequality & GBV', text: 'Women and girls face systemic discrimination, limited rights, and high rates of gender-based violence.' },
      { icon: 'fas fa-tree', title: 'Climate Change Impacts', text: 'Erratic weather, floods, and droughts threaten livelihoods, food production, and community resilience.' },
    ],
  },
  transparency: {
    subtitle: 'Commitment',
    title: 'Transparency & Accountability',
    description: 'We believe that trust is built on openness. Our stakeholders can count on us to be transparent in all our operations.',
    text: 'ERA-SS adheres to the highest standards of financial management, program monitoring, and reporting. We regularly share our progress with donors, communities, and the government to ensure mutual accountability.',
    commitments: [
      'Regular financial audits by independent firms',
      'Publicly available annual reports',
      'Community feedback mechanisms',
      'Zero tolerance for fraud and corruption',
      'Compliant with RRC regulations',
      'Protection of whistleblowers',
      'Gender and inclusion-sensitive programming',
      'Environmental sustainability in operations',
    ],
  },
  sdgs: {
    subtitle: 'Global Goals',
    title: 'SDGs We Support',
    description: 'Our work directly contributes to 7 Sustainable Development Goals, aligned with South Sudan\'s national priorities.',
    items: [
      { title: 'SDG 2 – Zero Hunger', text: 'Food security and sustainable agriculture.' },
      { title: 'SDG 3 – Good Health', text: 'Health and well-being for all.' },
      { title: 'SDG 4 – Quality Education', text: 'Inclusive and equitable education.' },
      { title: 'SDG 5 – Gender Equality', text: 'Empower women and girls.' },
      { title: 'SDG 6 – Clean Water', text: 'Water and sanitation for all.' },
      { title: 'SDG 13 – Climate Action', text: 'Combat climate change impacts.' },
      { title: 'SDG 16 – Peace, Justice', text: 'Promote peaceful and inclusive societies.' },
    ],
  },
  cta: {
    title: 'Be Part of the Change',
    text: 'Join us in our mission to build an equitable South Sudan. Partner, volunteer, or donate to support our work.',
  },
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-about');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const history = data.history;
  const visionMission = data.visionMission;
  const coreValues = data.coreValues;
  const genesis = data.genesis;
  const whyEra = data.whyEra;
  const transparency = data.transparency;
  const sdgs = data.sdgs;
  const cta = data.cta;

  return (
    <>
      {/* HERO */}
      <section className="hero about-hero" style={{ backgroundImage: `url(${hero.backgroundImage})`, height: '70vh', minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="slide-overlay" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{hero.title}</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: 600, margin: '10px auto 0', opacity: 0.9, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{hero.subtitle}</p>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="section bg-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="section-subtitle"><i className="fas fa-history" style={{ marginRight: 6 }}></i>{history.subtitle}</p>
              <h2 className="section-title">{history.title}</h2>
              <div style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                <p>{history.paragraph1}</p>
              </div>
              <div style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 14 }}>
                <p>{history.paragraph2}</p>
              </div>
              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="#vision-mission" className="btn btn-primary"><i className="fas fa-eye" style={{ marginRight: 8 }}></i>Our Vision</Link>
                <Link href="/contact" className="btn btn-secondary"><i className="fas fa-handshake" style={{ marginRight: 8 }}></i>Partner With Us</Link>
              </div>
            </div>
            <div>
              <img src={history.image} alt="ERA-SS team in the field" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision-mission" className="section bg-light">
        <div className="container">
          <div className="grid-2">
            <div className="card" style={{ borderLeft: '5px solid var(--era-primary)', padding: '32px 28px' }}>
              <h3 style={{ color: 'var(--era-primary)', fontSize: '1.4rem' }}><i className="fas fa-eye" style={{ marginRight: 10 }}></i>{visionMission.visionTitle}</h3>
              <p style={{ fontSize: '1.1rem', marginTop: 10, lineHeight: 1.7 }}>{visionMission.visionText}</p>
            </div>
            <div className="card" style={{ borderLeft: '5px solid var(--era-secondary)', padding: '32px 28px' }}>
              <h3 style={{ color: 'var(--era-primary)', fontSize: '1.4rem' }}><i className="fas fa-bullseye" style={{ marginRight: 10 }}></i>{visionMission.missionTitle}</h3>
              <p style={{ fontSize: '1.1rem', marginTop: 10, lineHeight: 1.7 }}>{visionMission.missionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="core-values" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-star" style={{ marginRight: 6 }}></i>{coreValues.subtitle}</p>
          <h2 className="section-title">{coreValues.title}</h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {coreValues.values.map((value: any, idx: number) => (
              <div className="value-card" key={idx}>
                <span className="icon-wrap"><i className={value.icon}></i></span>
                <h3>{value.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GENESIS (Aims & Objectives) */}
      <section id="genesis" className="section bg-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-seedling" style={{ marginRight: 6 }}></i>{genesis.subtitle}</p>
            <h2 className="section-title">{genesis.title}</h2>
            <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)' }}>{genesis.description}</p>
          </div>
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ padding: '28px 24px' }}>
              <h3 style={{ color: 'var(--era-primary)', marginBottom: 18 }}><i className="fas fa-flag-checkered" style={{ marginRight: 10 }}></i>{genesis.aimsTitle}</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, color: 'var(--text-muted)', lineHeight: 2.2 }}>
                {genesis.aims.map((aim: string, idx: number) => (
                  <li key={idx}><i className="fas fa-check-circle" style={{ color: 'var(--era-primary)', marginRight: 10, fontSize: '0.85rem' }}></i>{aim}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: '28px 24px' }}>
              <h3 style={{ color: 'var(--era-primary)', marginBottom: 18 }}><i className="fas fa-list-check" style={{ marginRight: 10 }}></i>{genesis.objectivesTitle}</h3>
              <ul style={{ listStyle: 'none', paddingLeft: 0, color: 'var(--text-muted)', lineHeight: 2.2 }}>
                {genesis.objectives.map((obj: string, idx: number) => (
                  <li key={idx}><i className="fas fa-check-circle" style={{ color: 'var(--era-primary)', marginRight: 10, fontSize: '0.85rem' }}></i>{obj}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ERA EXISTS */}
      <section id="why-era-exists" className="section why-era-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-question-circle" style={{ marginRight: 6 }}></i>{whyEra.subtitle}</p>
            <h2 className="section-title">{whyEra.title}</h2>
            <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{whyEra.description}</p>
          </div>
          <div className="grid-3">
            {whyEra.challenges.map((challenge: any, idx: number) => (
              <div className="challenge-card" key={idx}>
                <div className="challenge-icon"><i className={challenge.icon}></i></div>
                <div>
                  <h4>{challenge.title}</h4>
                  <p>{challenge.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY & ACCOUNTABILITY */}
      <section id="transparency" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-balance-scale" style={{ marginRight: 6 }}></i>{transparency.subtitle}</p>
            <h2 className="section-title">{transparency.title}</h2>
            <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)' }}>{transparency.description}</p>
          </div>
          <p style={{ maxWidth: 800, margin: '0 auto 24px', color: 'var(--text-muted)', fontSize: '1.05rem', textAlign: 'center' }}>
            {transparency.text}
          </p>
          <div className="grid-2" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="card" style={{ padding: '28px 24px' }}>
              <h3 style={{ color: 'var(--era-primary)', marginBottom: 18 }}><i className="fas fa-check-circle" style={{ marginRight: 10 }}></i> Our Commitments</h3>
              <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', lineHeight: 2.2 }}>
                {transparency.commitments.map((item: string, idx: number) => (
                  <li key={idx}><i className="fas fa-angle-right" style={{ color: 'var(--era-primary)', marginRight: 8 }}></i>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section id="sdgs" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-globe" style={{ marginRight: 6 }}></i>{sdgs.subtitle}</p>
          <h2 className="section-title">{sdgs.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{sdgs.description}</p>
          <div className="grid-3">
            {sdgs.items.map((item: any, idx: number) => (
              <div className="card" key={idx}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary-dark)' }}>
        <div className="container text-center">
          <h2><i className="fas fa-handshake" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p>{cta.text}</p>
          <Link href="/contact" className="btn btn-light"><i className="fas fa-arrow-right" style={{ marginRight: 8 }}></i>Get Involved</Link>
          <Link href="/support" className="btn btn-outline-light"><i className="fas fa-heart" style={{ marginRight: 8 }}></i>Support Us</Link>
        </div>
      </section>
    </>
  );
}