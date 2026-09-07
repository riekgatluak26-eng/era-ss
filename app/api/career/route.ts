import { NextResponse } from 'next/server';
import { createClient } from 'redis';

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

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-career');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-career', JSON.stringify(body));
  return NextResponse.json({ success: true });
}