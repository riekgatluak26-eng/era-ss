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
    title: 'Join Our Team',
    subtitle: 'Build your career with purpose, or give your time to make a difference.',
    backgroundImage: '/images/equity2.jpg',
  },
  openings: {
    subtitle: 'Current Openings',
    title: 'Work With Us',
    description: 'ERA-SS is an equal-opportunity employer. We seek talented, committed individuals to help drive our mission forward.',
    jobs: [
      {
        title: 'Monitoring & Evaluation Officer',
        location: 'Juba, South Sudan',
        type: 'Full-time',
        description: 'Design and implement M&E frameworks, collect field data, and report on program impact. Requires 3+ years of experience in M&E with an NGO.',
      },
      {
        title: 'Finance Assistant',
        location: 'Bor, Jonglei',
        type: 'Full-time',
        description: 'Support financial transactions, budgeting, and donor reporting. Degree in Accounting or Finance required.',
      },
    ],
    note: "No position matches your profile? Send us an unsolicited application – we're always looking for great people.",
  },
  whyJoin: {
    subtitle: 'Work With Purpose',
    title: 'Why Join ERA-SS?',
    description: 'At ERA-SS, your work goes beyond a job—it becomes an opportunity to create lasting change in the lives of individuals, families, and communities across South Sudan. We value integrity, innovation, collaboration, and professional growth while fostering an inclusive and respectful workplace.',
    items: [
      { icon: 'fas fa-globe-africa', title: 'Meaningful Impact', text: 'Work that creates positive social change.' },
      { icon: 'fas fa-chart-line', title: 'Professional Growth', text: 'Learning and career development opportunities.' },
      { icon: 'fas fa-users', title: 'Inclusive Culture', text: 'Collaborative and respectful workplace.' },
      { icon: 'fas fa-handshake', title: 'Diverse Partnerships', text: 'Work with communities and partners.' },
      { icon: 'fas fa-balance-scale', title: 'Integrity & Accountability', text: 'A culture of ethical governance.' },
      { icon: 'fas fa-seedling', title: 'Sustainable Development', text: "Contribute to South Sudan's future." },
    ],
  },
  recruitment: {
    subtitle: 'How to Apply',
    title: 'Our Recruitment Process',
    description: 'We are committed to a fair, transparent, and merit-based recruitment process.',
    steps: [
      { title: '1. Submit Your Application', text: 'Complete the online application or send your CV and cover letter.' },
      { title: '2. Application Review', text: 'Our recruitment team reviews all applications against the job requirements.' },
      { title: '3. Interview & Assessment', text: 'Shortlisted candidates may be invited for interviews and practical assessments.' },
      { title: '4. Selection', text: 'The successful candidate receives an employment offer and onboarding information.' },
    ],
  },
  volunteer: {
    subtitle: 'Volunteer With Us',
    title: 'Share Your Time & Skills',
    description: "Volunteering with ERA-SS is a rewarding experience. Whether you're a student, professional, or retiree, your time and expertise can change lives in South Sudan.",
    opportunities: 'We have opportunities in teaching, healthcare, data entry, communications, community mobilization, and event support. Volunteers receive orientation, mentorship, and a certificate of service.',
    reasonsTitle: 'Why Volunteer?',
    reasons: [
      'Make a tangible impact in vulnerable communities',
      'Gain hands-on field experience in development work',
      'Build your network with local and international professionals',
    ],
    image: '/images/equity1.jpg',
  },
  equalOpportunity: {
    subtitle: 'Commitment',
    title: 'Equal Opportunity Employer',
    paragraph1: 'ERA-SS is committed to creating a diverse, inclusive, and respectful workplace. We welcome applications from qualified candidates regardless of gender, age, disability, ethnicity, religion, or background.',
    paragraph2: 'As part of our commitment to safeguarding, successful applicants may be required to undergo reference checks and comply with our safeguarding, child protection, and code of conduct policies before appointment.',
  },
  cta: {
    title: 'Make a Difference Today',
    text: "Whether you apply for a job or volunteer your time, you'll be part of a movement that's reshaping South Sudan.",
  },
};

export const dynamic = 'force-dynamic';

export default async function CareerPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-career');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const openings = data.openings;
  const whyJoin = data.whyJoin;
  const recruitment = data.recruitment;
  const volunteer = data.volunteer;
  const equalOpportunity = data.equalOpportunity;
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

      {/* CURRENT OPENINGS */}
      <section id="careers" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-briefcase" style={{ marginRight: 6 }}></i>{openings.subtitle}</p>
            <h2 className="section-title">{openings.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{openings.description}</p>
          </div>
          <div className="grid-2" style={{ gap: 30 }}>
            {openings.jobs.map((job: any, idx: number) => (
              <div className="card job-card" style={{ padding: '28px 24px', borderLeft: '4px solid var(--era-primary)' }} key={idx}>
                <h3 style={{ color: '#111', marginBottom: 6 }}>{job.title}</h3>
                <p style={{ color: 'var(--era-primary)', fontWeight: 600, marginBottom: 12 }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: 6 }}></i> {job.location} &nbsp;|&nbsp;
                  <i className="fas fa-clock" style={{ marginRight: 6 }}></i> {job.type}
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>{job.description}</p>
                <Link href="/contact" className="btn btn-primary"><i className="fas fa-paper-plane" style={{ marginRight: 8 }}></i>Apply Now</Link>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <p style={{ color: 'var(--text-muted)' }}>{openings.note}</p>
            <Link href="/contact" className="btn btn-outline" style={{ marginTop: 12, borderColor: 'var(--era-primary)', color: 'var(--era-primary)' }}><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Spontaneous Application</Link>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section id="why-join" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-star" style={{ marginRight: 6 }}></i>{whyJoin.subtitle}</p>
          <h2 className="section-title">{whyJoin.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{whyJoin.description}</p>
          <div className="grid-3" style={{ gap: 24 }}>
            {whyJoin.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: 24 }} key={idx}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
                <h4>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECRUITMENT PROCESS */}
      <section id="recruitment" className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-clipboard-list" style={{ marginRight: 6 }}></i>{recruitment.subtitle}</p>
            <h2 className="section-title">{recruitment.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{recruitment.description}</p>
          </div>
          <div className="grid-2" style={{ gap: 30 }}>
            {recruitment.steps.map((step: any, idx: number) => (
              <div className="card" style={{ padding: 24, borderLeft: `5px solid ${idx % 2 === 0 ? 'var(--era-primary)' : 'var(--era-secondary)'}` }} key={idx}>
                <h3 style={{ color: 'var(--era-primary)' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" className="section bg-light">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 40 }}>
            <div>
              <p className="section-subtitle"><i className="fas fa-hands-helping" style={{ marginRight: 6 }}></i>{volunteer.subtitle}</p>
              <h2 className="section-title">{volunteer.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>{volunteer.description}</p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>{volunteer.opportunities}</p>
              <div className="card" style={{ background: '#fff', border: '1px solid #eee', padding: '18px 20px', marginBottom: 20 }}>
                <h4 style={{ color: 'var(--era-primary)', marginBottom: 8 }}><i className="fas fa-check-circle" style={{ marginRight: 8 }}></i>{volunteer.reasonsTitle}</h4>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {volunteer.reasons.map((reason: string, idx: number) => (
                    <li key={idx}><i className="fas fa-angle-right" style={{ color: 'var(--era-primary)', marginRight: 8 }}></i>{reason}</li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="btn btn-primary"><i className="fas fa-user-plus" style={{ marginRight: 8 }}></i>Sign Up to Volunteer</Link>
            </div>
            <div>
              <img src={volunteer.image} alt="ERA-SS volunteers working with community" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* EQUAL OPPORTUNITY */}
      <section id="equal-opportunity" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-shield-alt" style={{ marginRight: 6 }}></i>{equalOpportunity.subtitle}</p>
          <h2 className="section-title">{equalOpportunity.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{equalOpportunity.paragraph1}</p>
          <p style={{ maxWidth: 700, margin: '16px auto 0', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{equalOpportunity.paragraph2}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-users" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/contact" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-paper-plane" style={{ marginRight: 8 }}></i>Get In Touch</Link>
            <Link href="/support" className="btn btn-outline-light"><i className="fas fa-heart" style={{ marginRight: 8 }}></i>Support Our Work</Link>
          </div>
        </div>
      </section>
    </>
  );
}