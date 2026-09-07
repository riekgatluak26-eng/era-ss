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
    title: 'FAQs',
    subtitle: 'Everything you need to know about Equity Resource Aid – South Sudan.',
    backgroundImage: '/images/equity4.jpg',
  },
  faqContent: {
    subtitle: 'Quick Answers',
    title: 'How We Operate',
    description: 'Find answers to the most common questions about our mission, programs, and ways you can get involved.',
    items: [
      { icon: 'fas fa-building', question: 'What is ERA-SS?', answer: 'Equity Resource Aid – South Sudan (ERA-SS) is a registered national non-governmental organization founded on 10th June 2026. We work to empower communities through equitable access to education, livelihoods, peacebuilding, protection, youth empowerment, gender equality, and climate resilience across all 10 states of South Sudan.' },
      { icon: 'fas fa-bullseye', question: "What is ERA's mission?", answer: 'All citizens, regardless of their backgrounds, working together, uphold the peace and stability, and take the lead in fulfilling their talents and skills for a progressive change. We aim to create enabling opportunities for everyone to achieve their needs.' },
      { icon: 'fas fa-map-marked-alt', question: 'Where does ERA work?', answer: 'We operate in all 10 states of South Sudan—from the capital Juba to remote rural areas. Our field teams work directly with communities, local partners, and government structures.' },
      { icon: 'fas fa-hand-holding-heart', question: 'How can I donate or support ERA?', answer: 'You can support us by visiting our Support page or contacting us directly. We accept financial donations, in-kind contributions, and volunteer expertise. Every contribution helps us reach more vulnerable communities.' },
      { icon: 'fas fa-users', question: 'Can I volunteer with ERA?', answer: 'Absolutely! We welcome volunteers with diverse skills. Visit our Contact page and send us a message outlining your interests and experience. We’ll connect you with opportunities that match your expertise.' },
      { icon: 'fas fa-file-invoice-dollar', question: 'How is ERA funded?', answer: 'ERA-SS is funded through grants, partnerships, donations, and contributions from individuals, organizations, and development partners. We are committed to transparent financial management and responsible stewardship of all resources.' },
      { icon: 'fas fa-shield-alt', question: 'How does ERA ensure transparency and accountability?', answer: 'ERA-SS is committed to transparency, ethical governance, responsible financial management, and regular monitoring of our programs. We strive to ensure that all resources are used effectively and in the best interests of the communities we serve.' },
      { icon: 'fas fa-handshake', question: 'How can my organization partner with ERA?', answer: 'We’re always looking for strategic partnerships. Reach out via our Contact page or email contact@era-ss.org. We’ll explore synergies in program implementation, advocacy, and resource mobilization.' },
      { icon: 'fas fa-briefcase', question: 'Does ERA offer job opportunities?', answer: 'Yes, we regularly post vacancies on our Careers page. Check back often or follow our social media channels for the latest openings.' },
      { icon: 'fas fa-child', question: 'How do you protect children and vulnerable adults?', answer: 'Safeguarding is at the heart of everything we do. We have a strict Child Protection Policy and Code of Conduct that all staff and partners must follow. We also provide training and reporting mechanisms to prevent and respond to any form of abuse.' },
    ],
  },
  resources: {
    subtitle: 'Documents',
    title: 'Helpful Resources',
    description: 'Looking for more information? Explore our policies, reports, and organizational documents to learn more about how ERA-SS operates and delivers impact.',
    items: [
      { icon: 'fas fa-file-alt', title: 'Annual Reports', text: 'Review our yearly progress and impact.', link: '/report' },
      { icon: 'fas fa-compass', title: 'Strategic Plan', text: 'Our roadmap for the future.', link: '/report' },
      { icon: 'fas fa-shield-alt', title: 'Safeguarding Policy', text: 'Available upon request.', link: '/contact' },
      { icon: 'fas fa-child', title: 'Child Protection Policy', text: 'Available upon request.', link: '/contact' },
      { icon: 'fas fa-file-contract', title: 'Code of Conduct', text: 'Available upon request.', link: '/contact' },
      { icon: 'fas fa-chart-pie', title: 'Financial Reports', text: 'Transparency in numbers.', link: '/report' },
    ],
  },
  getInTouch: {
    subtitle: 'Still need help?',
    title: 'Get in Touch',
    description: "If you can't find the answer you're looking for, our team is ready to assist you.",
    email: 'contact@era-ss.org',
    phones: ['+211 927 757 777', '+211 928 118 089'],
    address: 'Shirikat, Juba, South Sudan',
    responseNote: 'We aim to respond to all enquiries within 1–2 business days.',
  },
  cta: {
    title: 'Support Our Mission',
    text: 'Your contribution helps us answer more questions and reach more communities.',
  },
};

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-faq');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const faqContent = data.faqContent;
  const resources = data.resources;
  const getInTouch = data.getInTouch;
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

      {/* FAQ CONTENT */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-question-circle" style={{ marginRight: 6 }}></i>{faqContent.subtitle}</p>
            <h2 className="section-title">{faqContent.title}</h2>
            <p style={{ maxWidth: 600, margin: '0 auto', color: 'var(--text-muted)' }}>{faqContent.description}</p>
          </div>
          <div className="grid-2" style={{ gap: 30 }}>
            {faqContent.items.map((item: any, idx: number) => (
              <div className="card" style={{ padding: '28px 24px' }} key={idx}>
                <h3 style={{ color: 'var(--era-primary)', marginBottom: 12 }}>
                  <i className={item.icon} style={{ marginRight: 10 }}></i>{item.question}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item.answer }}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HELPFUL RESOURCES */}
      <section id="resources" className="section bg-light">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-folder-open" style={{ marginRight: 6 }}></i>{resources.subtitle}</p>
          <h2 className="section-title">{resources.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{resources.description}</p>
          <div className="grid-3" style={{ gap: 24 }}>
            {resources.items.map((item: any, idx: number) => (
              <Link href={item.link} key={idx} className="card resource-card" style={{ textAlign: 'center', padding: 24, textDecoration: 'none', color: 'inherit' }}>
                <i className={item.icon} style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
                <h4>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <section id="get-in-touch" className="section bg-white">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-phone-alt" style={{ marginRight: 6 }}></i>{getInTouch.subtitle}</p>
          <h2 className="section-title">{getInTouch.title}</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 30px', color: 'var(--text-muted)' }}>{getInTouch.description}</p>
          <div className="grid-3" style={{ gap: 24, maxWidth: 900, margin: '0 auto' }}>
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <i className="fas fa-envelope" style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
              <h4>Email</h4>
              <p style={{ color: 'var(--text-muted)' }}><a href={`mailto:${getInTouch.email}`} style={{ color: 'var(--era-primary)' }}>{getInTouch.email}</a></p>
            </div>
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <i className="fas fa-phone" style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
              <h4>Phone</h4>
              {getInTouch.phones.map((phone: string, idx: number) => (
                <p key={idx} style={{ color: 'var(--text-muted)' }}>{phone}</p>
              ))}
            </div>
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: 'var(--era-primary)', marginBottom: 12 }}></i>
              <h4>Office</h4>
              <p style={{ color: 'var(--text-muted)' }}>{getInTouch.address}</p>
            </div>
          </div>
          <p style={{ marginTop: 24, color: 'var(--text-muted)', fontStyle: 'italic' }}>{getInTouch.responseNote}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/contact" className="btn btn-primary"><i className="fas fa-paper-plane" style={{ marginRight: 8 }}></i>Send a Message</Link>
          </div>
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