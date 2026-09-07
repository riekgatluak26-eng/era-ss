import { createClient } from 'redis';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

let redis: any = null;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

// Full default data exactly as originally designed
const defaultData: any = {
  hero: {
    title: 'Empowering with Equality',
    slides: [
      { image: '/images/equity.jpg', alt: 'Community gathering in South Sudan' },
      { image: '/images/equity1.jpg', alt: 'ERA-SS field work' },
      { image: '/images/equity2.jpg', alt: 'ERA-SS community engagement' },
      { image: '/images/equity3.jpg', alt: 'ERA-SS program activity' },
      { image: '/images/equity4.jpg', alt: 'ERA-SS program activity' },
      { image: '/images/equity5.jpg', alt: 'ERA-SS program activity' },
    ],
  },
  aboutCta: {
    title: 'Join Us in Building a Better South Sudan',
    text: 'ERA-SS is driven by a vision of an inclusive, peaceful, and prosperous nation. Your partnership can help turn this vision into reality.',
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
  background: {
    subtitle: 'Background',
    title: 'Who We Are',
    paragraph1: 'Equity Resource Aid (ERA) is a non-profit national non-governmental organization founded and registered with the Relief and Rehabilitation Commission (RRC) of the Republic of South Sudan on 10th June 2026. We are geared towards building an equitable society in all aspects of life. Together with national and international partners, we respond to humanitarian crises and support long-term solutions that empower and improve the living conditions for the neediest neglected people.',
    paragraph2: 'ERA was founded to ensure that the voices and needs of communities are heard, responded to, and changed through equitable redistribution of resources for all, especially the most underprivileged segments of society. As an impact-oriented & human-centered organization, we use innovative evidence and data-driven decision-making to contribute to a just and equal world.',
    image: '/images/equity.jpg',
  },
  visionMission: {
    visionTitle: 'Our Vision',
    visionText: 'Creating enabling opportunities for all people to achieve their needs, actively embracing continual social inclusion, change, and justice to take center stage in achieving optimum human development.',
    missionTitle: 'Our Mission',
    missionText: 'All citizens, regardless of their backgrounds, working together, uphold the peace and stability, and take the lead in fulfilling their talents and skills for a progressive change.',
  },
  coreValues: {
    subtitle: 'Core Values',
    title: 'What We Stand For',
    values: [
      { icon: 'fas fa-hand-holding-heart', title: 'Dignity', text: 'Every person deserves respect and inherent worth.' },
      { icon: 'fas fa-globe-africa', title: 'Respect for All', text: 'Honouring diversity and uniqueness.' },
      { icon: 'fas fa-balance-scale', title: 'Equality', text: 'Fair opportunities for everyone.' },
      { icon: 'fas fa-clipboard-check', title: 'Accountability', text: 'Transparent and responsible stewardship.' },
      { icon: 'fas fa-fire', title: 'Dedication', text: 'Unwavering commitment to our mission.' },
      { icon: 'fas fa-wheelchair', title: 'Inclusion', text: 'Leaving no one behind.' },
    ],
  },
  aimsObjectives: {
    subtitle: 'Aims & Objectives',
    title: '9 Foundational Aims & 10 Strategic Objectives',
    aimsTitle: 'Aims',
    objectivesTitle: 'Objectives',
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
  coverageCta: {
    title: 'Working Nationwide — Reach Every Community',
    text: 'From Juba to the remotest villages, ERA-SS is present in all 10 states. We partner with local communities to deliver impact where it\'s needed most.',
  },
  coverage: {
    subtitle: 'Coverage',
    title: 'Working Nationwide',
    paragraph1: 'We operate nation-wide, collaborating with community and youth-led NGOs, networks and changemakers as well as working with the government\'s existing structures and systems to reach the most vulnerable and marginalized groups.',
    paragraph2: 'Our work contributes towards the Sustainable Development Goals (2, 3, 4, 5, 6, 13, and 16), the South Sudan Growth Development Strategy and South Sudan Vision 2030.',
    stats: [
      { value: '10', label: 'States' },
      { value: '7', label: 'SDGs' },
      { value: 'Nationwide', label: 'Reach' },
    ],
    image: '/images/equity1.jpg',
  },
  programs: {
    subtitle: 'Programmatic Focus',
    title: 'Seven Thematic Areas',
    items: [
      { icon: 'fas fa-graduation-cap', title: 'Education', text: 'Quality learning, teacher training, inclusive materials.' },
      { icon: 'fas fa-seedling', title: 'Agriculture & Livelihood', text: 'Skills, enterprise, climate-smart farming.' },
      { icon: 'fas fa-dove', title: 'Peacebuilding & Advocacy', text: 'Dialogue, reconciliation, policy advocacy.' },
      { icon: 'fas fa-users', title: 'Youth Empowerment', text: 'Leadership, sports, digital skills.' },
      { icon: 'fas fa-shield-alt', title: 'General Protection', text: 'Women, children, elderly, persons with disabilities.' },
      { icon: 'fas fa-venus-mars', title: 'Gender Equality', text: 'Women\'s rights, economic empowerment, ending GBV.' },
      { icon: 'fas fa-tree', title: 'Climate Resilience', text: 'Conservation, afforestation, community-led adaptation.' },
    ],
  },
  approachCta: {
    title: 'Innovative Approaches for Sustainable Change',
    text: 'From capacity building to youth participation, our methods are designed to create lasting impact and empower communities to lead their own development.',
  },
  approaches: {
    subtitle: 'ERA Approaches',
    title: 'How We Create Change',
    items: [
      { icon: 'fas fa-chart-line', title: 'Capacity Building', text: 'Developing young leaders with skills in leadership, research, advocacy, and communication.' },
      { icon: 'fas fa-users', title: 'Peer Education', text: 'Trained peer educators provide support and networking for marginalized youth.' },
      { icon: 'fas fa-comments', title: 'Meaningful Youth Participation', text: 'Young people integrated into programmatic, policy, and institutional decision-making.' },
      { icon: 'fas fa-futbol', title: 'Sports & Arts for Development', text: 'Using sports and expressive arts to discuss education, health, and gender equality.' },
      { icon: 'fas fa-bullhorn', title: 'Media & Communications', text: 'Digital advocacy and social media tools to amplify youth voices.' },
      { icon: 'fas fa-wave-square', title: 'Youth Wave', text: 'Meaningful youth participation drives change and leadership for tomorrow.' },
    ],
  },
  partners: {
    subtitle: 'Strategic Partnerships',
    title: 'Trusted Partners & Donors',
    description: 'We work with UN agencies, CSOs, foundations, and the Government of South Sudan to provide strategic support for vulnerable communities.',
    logos: [
      { src: '/images/partner11.png', alt: 'UNICEF' },
      { src: '/images/partner2.png', alt: 'UNHCR' },
      { src: '/images/partner3.png', alt: 'WFP' },
      { src: '/images/partner4.png', alt: 'UNDP' },
      { src: '/images/partner5.png', alt: 'WHO' },
      { src: '/images/partner6.png', alt: 'UNFPA' },
      { src: '/images/partner10.png', alt: 'GIZ' },
      { src: '/images/partner8.png', alt: 'USAID' },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      { icon: 'fas fa-building', question: 'Who is ERA-SS?', answer: 'A registered national NGO working across South Sudan to empower communities through equitable development.' },
      { icon: 'fas fa-handshake', question: 'How can I partner?', answer: 'Reach out via email or the contact form. We welcome collaboration with donors and agencies.' },
      { icon: 'fas fa-user-plus', question: 'How can I volunteer?', answer: 'Send us a message with your skills and interest – we\'ll connect you with opportunities.' },
      { icon: 'fas fa-shield-alt', question: 'How do you ensure transparency?', answer: 'We adhere to strict accountability standards and provide reports upon request.' },
    ],
  },
  support: {
    title: 'Support Our Mission',
    text: 'Your generosity helps us build a more equitable South Sudan through education, peace, and sustainable development.',
    actions: [
      { icon: 'fas fa-handshake', label: 'Become a Partner', href: '/contact' },
      { icon: 'fas fa-user-plus', label: 'Volunteer', href: '/contact' },
      { icon: 'fas fa-donate', label: 'Donate', href: '/contact' },
      { icon: 'fas fa-envelope', label: 'Contact Us', href: '/contact' },
    ],
  },
  contact: {
    subtitle: 'Get In Touch',
    title: 'We\'d Love to Hear From You',
    description: 'Reach out to collaborate, volunteer, donate, or learn more about our work across South Sudan.',
    infoItems: [
      { icon: 'fas fa-location-dot', title: 'Head Office', lines: ['Shirikat, Juba, Republic of South Sudan'] },
      { icon: 'fas fa-phone', title: 'Phone', lines: ['+211 927 757 777', '+211 928 118 089', '+211 922 503 888', '+211 927 036 669'] },
      { icon: 'fas fa-envelope', title: 'Email', lines: ['info@era-ss.org'] },
    ],
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/people/Equity-Resource-Aid-South-Sudan/61590477338666/' },
      { platform: 'Instagram', url: 'https://www.instagram.com/equityresourceaid?igsh=MTRuMzd4bTc2azZmZA==' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/equity-resource-aid-south-sudan-45a908414' },
      { platform: 'WhatsApp', url: 'https://wa.me/211928118089' },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let data = { ...defaultData };

  try {
    const client = await getClient();
    const raw = await client.get('era-homepage');
    if (raw) {
      data = { ...defaultData, ...JSON.parse(raw) };
    }
  } catch (error) {
    console.error('Redis connection failed, using default content:', error);
  }

  const hero = data.hero;
  const aboutCta = data.aboutCta;
  const whyEra = data.whyEra;
  const background = data.background;
  const visionMission = data.visionMission;
  const coreValues = data.coreValues;
  const aimsObjectives = data.aimsObjectives;
  const coverageCta = data.coverageCta;
  const coverage = data.coverage;
  const programs = data.programs;
  const approachCta = data.approachCta;
  const approaches = data.approaches;
  const partners = data.partners;
  const faq = data.faq;
  const support = data.support;
  const contact = data.contact;

  return (
    <>
      {/* HERO SLIDER */}
      <section className="hero" id="home">
        {hero.slides.map((slide: any, idx: number) => (
          <div
            key={idx}
            className={`slide ${idx === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={slide.alt}
          ></div>
        ))}
        <div className="slide-overlay"></div>
        <div className="hero-content container">
          <div className="hero-text">
            <h1>{hero.title}</h1>
            <div>
              <Link href="/about" className="btn btn-primary">
                <i className="fas fa-info-circle" style={{ marginRight: 8 }}></i>Learn About Us
              </Link>
              <Link href="/support" className="btn btn-outline">
                <i className="fas fa-hand-holding-heart" style={{ marginRight: 8 }}></i>Support Our Mission
              </Link>
            </div>
          </div>
        </div>
        <div className="slider-dots" id="sliderDots"></div>
      </section>

      {/* CTA BANNER 1 (About) */}
      <section className="cta-banner" style={{ background: 'var(--era-primary-dark)' }}>
        <div className="container">
          <h2><i className="fas fa-bullseye" style={{ marginRight: 12 }}></i>{aboutCta.title}</h2>
          <p>{aboutCta.text}</p>
          <Link href="/about" className="btn btn-light"><i className="fas fa-arrow-right" style={{ marginRight: 8 }}></i>Discover Our Story</Link>
          <Link href="/contact" className="btn btn-outline-light"><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>Get in Touch</Link>
        </div>
      </section>

      {/* WHY ERA EXISTS */}
      <section className="section why-era-section" id="why-era-exists">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-question-circle" style={{ marginRight: 6 }}></i>{whyEra.subtitle}</p>
            <h2 className="section-title">{whyEra.title}</h2>
            <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              {whyEra.description}
            </p>
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

      {/* BACKGROUND / WHO WE ARE */}
      <section className="section bg-white" id="background">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="section-subtitle"><i className="fas fa-flag" style={{ marginRight: 6 }}></i>{background.subtitle}</p>
              <h2 className="section-title">{background.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {background.paragraph1}
              </p>
              <p style={{ marginTop: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {background.paragraph2}
              </p>
              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/about#vision" className="btn btn-primary"><i className="fas fa-eye" style={{ marginRight: 8 }}></i>Our Vision</Link>
                <Link href="/contact" className="btn btn-secondary"><i className="fas fa-handshake" style={{ marginRight: 8 }}></i>Partner With Us</Link>
              </div>
            </div>
            <div>
              <img src={background.image} alt="ERA-SS team" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section bg-light" id="vision">
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
      <section className="section bg-white" id="core-values">
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

      {/* AIMS & OBJECTIVES */}
      <section className="section bg-light" id="aims">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <p className="section-subtitle"><i className="fas fa-bullseye" style={{ marginRight: 6 }}></i>{aimsObjectives.subtitle}</p>
            <h2 className="section-title">{aimsObjectives.title}</h2>
          </div>
          <div className="grid-2">
            <div className="card" style={{ padding: '28px 24px' }}>
              <h3 style={{ color: 'var(--era-primary)', marginBottom: 18 }}><i className="fas fa-flag-checkered" style={{ marginRight: 10 }}></i>{aimsObjectives.aimsTitle}</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, color: 'var(--text-muted)', lineHeight: 2 }}>
                {aimsObjectives.aims.map((aim: string, idx: number) => (
                  <li key={idx}><i className="fas fa-th-large aim-icon"></i>{aim}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ padding: '28px 24px' }}>
              <h3 style={{ color: 'var(--era-primary)', marginBottom: 18 }}><i className="fas fa-list-check" style={{ marginRight: 10 }}></i>{aimsObjectives.objectivesTitle}</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, color: 'var(--text-muted)', lineHeight: 2 }}>
                {aimsObjectives.objectives.map((obj: string, idx: number) => (
                  <li key={idx}><i className="fas fa-th-large aim-icon"></i>{obj}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER 2 (Coverage) */}
      <section className="cta-banner" style={{ background: 'var(--era-secondary)', color: '#000' }}>
        <div className="container">
          <h2 style={{ color: '#000' }}><i className="fas fa-map-marked-alt" style={{ marginRight: 12 }}></i>{coverageCta.title}</h2>
          <p style={{ color: '#222' }}>{coverageCta.text}</p>
          <Link href="/programs" className="btn" style={{ background: '#000', color: '#fff', borderColor: '#000' }}><i className="fas fa-arrow-right" style={{ marginRight: 8 }}></i>Explore Our Coverage</Link>
          <Link href="/partners" className="btn btn-outline-light" style={{ borderColor: 'rgba(0,0,0,0.5)', color: '#000' }}><i className="fas fa-handshake" style={{ marginRight: 8 }}></i>Become a Partner</Link>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="section bg-white" id="coverage">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="coverage-image-wrapper">
              <img src={coverage.image} alt="South Sudan community members" loading="lazy" />
            </div>
            <div>
              <p className="section-subtitle"><i className="fas fa-globe" style={{ marginRight: 6 }}></i>{coverage.subtitle}</p>
              <h2 className="section-title">{coverage.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
                {coverage.paragraph1}
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20 }}>
                {coverage.paragraph2}
              </p>
              <div className="coverage-stats">
                {coverage.stats.map((stat: any, idx: number) => (
                  <div className="coverage-stat" key={idx}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <Link href="/contact" className="btn btn-primary"><i className="fas fa-handshake" style={{ marginRight: 8 }}></i>Partner With Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMMATIC FOCUS */}
      <section className="section bg-light" id="programs">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-th-large" style={{ marginRight: 6 }}></i>{programs.subtitle}</p>
          <h2 className="section-title">{programs.title}</h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {programs.items.map((item: any, idx: number) => (
              <div className="card" key={idx}>
                <h3><i className={item.icon} style={{ color: 'var(--era-primary)', marginRight: 10 }}></i>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href="/programs" className="btn btn-primary"><i className="fas fa-arrow-right" style={{ marginRight: 8 }}></i>Get Involved</Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER 3 (Approach) */}
      <section className="cta-banner" style={{ background: '#1a1a1a' }}>
        <div className="container">
          <h2><i className="fas fa-lightbulb" style={{ marginRight: 12 }}></i>{approachCta.title}</h2>
          <p>{approachCta.text}</p>
          <Link href="/approach" className="btn btn-light"><i className="fas fa-arrow-right" style={{ marginRight: 8 }}></i>Discover Our Approach</Link>
          <Link href="/support" className="btn btn-outline-light"><i className="fas fa-heart" style={{ marginRight: 8 }}></i>Support Our Work</Link>
        </div>
      </section>

      {/* ERA APPROACHES */}
      <section className="section bg-white" id="approach">
        <div className="container text-center">
          <p className="section-subtitle"><i className="fas fa-cogs" style={{ marginRight: 6 }}></i>{approaches.subtitle}</p>
          <h2 className="section-title">{approaches.title}</h2>
          <div className="grid-3" style={{ marginTop: 40 }}>
            {approaches.items.map((item: any, idx: number) => (
              <div className="card" key={idx}>
                <h3><i className={item.icon} style={{ color: 'var(--era-primary)', marginRight: 10 }}></i>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="partner-marquee-section" id="partners">
        <div className="container">
          <p className="section-subtitle"><i className="fas fa-handshake" style={{ marginRight: 6 }}></i>{partners.subtitle}</p>
          <h2 className="section-title">{partners.title}</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 10px' }}>
            {partners.description}
          </p>
        </div>
        <div className="partner-marquee-wrapper">
          <div className="partner-track">
            {partners.logos.map((logo: any, idx: number) => (
              <div className="partner-item" key={idx}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-light" id="faq">
        <div className="container">
          <h2 className="section-title text-center"><i className="fas fa-question-circle" style={{ color: 'var(--era-primary)', marginRight: 12 }}></i>{faq.title}</h2>
          <div className="grid-2" style={{ marginTop: 30 }}>
            {faq.items.map((item: any, idx: number) => (
              <div className="card" key={idx}>
                <h3><i className={item.icon} style={{ color: 'var(--era-primary)', marginRight: 10 }}></i>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="section" style={{ background: 'var(--era-primary)', color: '#fff' }} id="support">
        <div className="container text-center">
          <h2 style={{ color: '#fff' }}><i className="fas fa-heart" style={{ marginRight: 12 }}></i>{support.title}</h2>
          <p style={{ maxWidth: 500, margin: '0 auto', opacity: 0.9 }}>{support.text}</p>
          <div className="grid-4" style={{ marginTop: 40 }}>
            {support.actions.map((action: any, idx: number) => (
              <Link href={action.href} key={idx} className="card" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                <i className={action.icon} style={{ fontSize: '1.8rem', display: 'block', marginBottom: 8 }}></i>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <p className="section-subtitle"><i className="fas fa-phone-alt" style={{ marginRight: 6 }}></i>{contact.subtitle}</p>
            <h2 className="section-title">{contact.title}</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>{contact.description}</p>
          </div>
          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            <div className="contact-info-card">
              <h3 style={{ fontSize: '1.3rem', color: '#111', marginBottom: 6 }}>
                <i className="fas fa-map-pin" style={{ color: 'var(--era-primary)', marginRight: 10 }}></i>Contact Information
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 8 }}>We respond within 2 hours.</p>
              {contact.infoItems.map((item: any, idx: number) => (
                <div className="contact-info-item" key={idx}>
                  <div className="contact-info-icon"><i className={item.icon}></i></div>
                  <div>
                    <h4>{item.title}</h4>
                    {item.lines.map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 8, paddingTop: 12, borderTop: '1px solid #eee' }}>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 8, color: '#111' }}>Follow Us</p>
                {contact.socials.map((social: any, idx: number) => (
                  <a key={idx} href={social.url} target="_blank" className="social-icon-link" aria-label={social.platform}>
                    <i className={`fab fa-${social.platform.toLowerCase()}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}