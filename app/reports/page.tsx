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
    title: 'Reports & Publications',
    subtitle: 'Transparency, accountability, and learning at the heart of our work.',
    backgroundImage: '/images/equity4.jpg',
  },
  whyPublish: {
    subtitle: 'Transparency',
    title: 'Transparency Through Knowledge Sharing',
    description: 'ERA-SS believes that transparency, learning, and accountability are essential for creating meaningful and sustainable change. Through our reports and publications, we share our progress, challenges, lessons learned, and the impact of our programs with communities, partners, donors, and stakeholders.',
    points: [
      'Demonstrate accountability to communities and partners',
      'Share lessons and best practices',
      'Improve future programs',
      'Support evidence-based decision making',
      'Promote openness and trust',
    ],
  },
  categories: {
    subtitle: 'Resources',
    title: 'Explore Our Resources',
    description: 'Browse our publications by category. Full documents are available for download or upon request.',
    annualReports: {
      title: 'Annual Reports',
      description: 'Updates on programs, achievements, financial information, and organizational progress.',
      items: [
        { title: 'Annual Report 2025', description: 'Coming soon – our first annual report will be published after the completion of our initial programs.', file: '' },
        { title: 'Organizational Review', description: 'Future publication – summaries of our strategic progress and key milestones.', file: '' },
      ],
    },
    programReports: {
      title: 'Program Reports',
      description: 'Detailed information about specific projects and activities.',
      items: [
        { title: 'Education Program Reports', description: 'Available as projects are implemented.', file: '' },
        { title: 'Livelihood Assessments', description: 'Community livelihood and food security studies.', file: '' },
        { title: 'Peacebuilding Reports', description: 'Insights from dialogue and reconciliation initiatives.', file: '' },
      ],
    },
    researchAssessments: {
      title: 'Research & Assessments',
      description: 'Evidence, studies, and evaluations that guide our work.',
      items: [
        { title: 'Impact Assessments', description: 'Independent evaluations of program outcomes – available upon request.', file: '' },
        { title: 'Community Needs Assessments', description: 'Baseline studies to inform program design – available upon request.', file: '' },
      ],
    },
    policies: {
      title: 'Policies & Strategic Documents',
      description: 'Documents that guide our organization.',
      items: [
        { title: 'Strategic Plan 2026–2030', description: 'Our five-year roadmap – available upon request.', file: '' },
        { title: 'Safeguarding Policy', description: 'Child Protection Policy, Code of Conduct – available upon request.', file: '' },
      ],
    },
    note: 'We are in the process of finalizing and publishing our first official reports. Documents will be added as they become available.',
  },
  learning: {
    subtitle: 'Continuous Improvement',
    title: 'Learning From Our Work',
    description: 'We continuously evaluate our programs to understand what works, identify challenges, and improve how we serve communities. Our monitoring, evaluation, accountability, and learning approach helps us:',
    items: [
      'Measure program outcomes',
      'Listen to community feedback',
      'Adapt our interventions',
      'Improve efficiency',
      'Strengthen partnerships',
    ],
  },
  request: {
    title: 'Need Something Else?',
    description: "If you're looking for a specific document or older report, please reach out and we'll provide it.",
  },
  cta: {
    title: 'Support Transparency & Impact',
    text: 'Your donation helps us document and share our work, strengthening accountability and enabling evidence-based development.',
  },
};

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-reports');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const whyPublish = data.whyPublish;
  const categories = data.categories;
  const learning = data.learning;
  const request = data.request;
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

      {/* WHY PUBLISH */}
      <section id="why-publish" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-book-open" style={{ marginRight: 6 }}></i>{whyPublish.subtitle}</p>
          <h2 className="section-title">{whyPublish.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{whyPublish.description}</p>
          <div className="grid-2" style={{ marginTop: 30, gap: 20, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {whyPublish.points.map((point: string, idx: number) => (
              <div className="card" style={{ padding: 20, textAlign: 'left' }} key={idx}>
                <i className="fas fa-check-circle" style={{ color: 'var(--era-primary)', marginRight: 8 }}></i>{point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATION CATEGORIES */}
      <section id="categories" className="section bg-light">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-folder-tree" style={{ marginRight: 6 }}></i>{categories.subtitle}</p>
            <h2 className="section-title">{categories.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{categories.description}</p>
          </div>

          {/* Annual Reports */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ color: 'var(--era-primary)', marginBottom: 20 }}><i className="fas fa-calendar-alt" style={{ marginRight: 10 }}></i>{categories.annualReports.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{categories.annualReports.description}</p>
            <div className="grid-2" style={{ gap: 20 }}>
              {categories.annualReports.items.map((item: any, idx: number) => (
                <div className="card" style={{ padding: 20 }} key={idx}>
                  <h4>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.description}</p>
                  {item.file && (
                    <a href={item.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 10 }}>
                      <i className="fas fa-download" style={{ marginRight: 8 }}></i>Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Program Reports */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ color: 'var(--era-primary)', marginBottom: 20 }}><i className="fas fa-file-alt" style={{ marginRight: 10 }}></i>{categories.programReports.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{categories.programReports.description}</p>
            <div className="grid-3" style={{ gap: 20 }}>
              {categories.programReports.items.map((item: any, idx: number) => (
                <div className="card" style={{ padding: 20, textAlign: 'center' }} key={idx}>
                  <i className="fas fa-file" style={{ fontSize: '1.8rem', color: 'var(--era-primary)', marginBottom: 8 }}></i>
                  <h4>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.description}</p>
                  {item.file && (
                    <a href={item.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 10 }}>
                      <i className="fas fa-download" style={{ marginRight: 8 }}></i>Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Research & Assessments */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ color: 'var(--era-primary)', marginBottom: 20 }}><i className="fas fa-chart-bar" style={{ marginRight: 10 }}></i>{categories.researchAssessments.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{categories.researchAssessments.description}</p>
            <div className="grid-2" style={{ gap: 20 }}>
              {categories.researchAssessments.items.map((item: any, idx: number) => (
                <div className="card" style={{ padding: 20 }} key={idx}>
                  <h4>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.description}</p>
                  {item.file && (
                    <a href={item.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 10 }}>
                      <i className="fas fa-download" style={{ marginRight: 8 }}></i>Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Policies & Strategic Documents */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: 'var(--era-primary)', marginBottom: 20 }}><i className="fas fa-gavel" style={{ marginRight: 10 }}></i>{categories.policies.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>{categories.policies.description}</p>
            <div className="grid-2" style={{ gap: 20 }}>
              {categories.policies.items.map((item: any, idx: number) => (
                <div className="card" style={{ padding: 20 }} key={idx}>
                  <h4>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.description}</p>
                  {item.file && (
                    <a href={item.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 10 }}>
                      <i className="fas fa-download" style={{ marginRight: 8 }}></i>Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center" style={{ marginTop: 20 }}>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{categories.note}</p>
          </div>
        </div>
      </section>

      {/* ACCOUNTABILITY & LEARNING */}
      <section id="learning" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-sync-alt" style={{ marginRight: 6 }}></i>{learning.subtitle}</p>
          <h2 className="section-title">{learning.title}</h2>
          <p style={{ maxWidth: 700, margin: '0 auto 30px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>{learning.description}</p>
          <div className="grid-3" style={{ gap: 20, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {learning.items.map((item: string, idx: number) => (
              <div className="card" style={{ padding: 24, background: '#fef5f5', border: '1px solid rgba(198,40,40,0.1)' }} key={idx}>
                <i className="fas fa-check-circle" style={{ fontSize: '1.8rem', color: 'var(--era-primary)', marginBottom: 8 }}></i>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST A REPORT */}
      <section id="request" className="section bg-light">
        <div className="container text-center">
          <h2 className="section-title">{request.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 20px', color: 'var(--text-muted)' }}>{request.description}</p>
          <Link href="/contact" className="btn btn-primary"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Request a Report</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" style={{ background: 'var(--era-primary-dark)' }}>
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-hand-holding-heart" style={{ marginRight: 12 }}></i>{cta.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto', opacity: 0.9, color: '#fff' }}>{cta.text}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/support" className="btn btn-light" style={{ marginRight: 10 }}><i className="fas fa-hand-holding-usd" style={{ marginRight: 8 }}></i>Donate</Link>
            <Link href="/contact" className="btn btn-outline-light"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}