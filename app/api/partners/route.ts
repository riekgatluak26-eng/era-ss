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
    title: 'Our Partners',
    subtitle: 'We are stronger together. Collaboration powers our mission for a more equitable South Sudan.',
    backgroundImage: '/images/equity5.jpg',
  },
  whyPartnerships: {
    subtitle: 'Collaboration',
    title: 'Working Together for Greater Impact',
    paragraph1: 'Sustainable development requires collaboration. ERA-SS believes that meaningful partnerships strengthen communities, expand resources, and create lasting solutions to complex humanitarian and development challenges.',
    paragraph2: 'We work alongside government institutions, civil society organizations, community-based organizations, development agencies, academic institutions, and the private sector to design and implement programs that improve lives across South Sudan.',
  },
  partnerLogos: {
    subtitle: 'Building Strategic Partnerships',
    title: 'Our Valued Partners',
    description: 'ERA-SS is actively cultivating collaborations with organizations that share our vision. Below are some of the institutions we aim to work with as we expand our reach.',
    logos: [
      { src: '/images/partner11.png', alt: 'Partner' },
      { src: '/images/partner2.png', alt: 'Partner' },
      { src: '/images/partner3.png', alt: 'Partner' },
      { src: '/images/partner4.png', alt: 'Partner' },
      { src: '/images/partner5.png', alt: 'Partner' },
      { src: '/images/partner6.png', alt: 'Partner' },
      { src: '/images/partner10.png', alt: 'Partner' },
      { src: '/images/partner8.png', alt: 'Partner' },
    ],
  },
  partnershipOpportunities: {
    subtitle: 'Ways to Partner',
    title: 'Ways to Partner with ERA-SS',
    description: 'Explore the many ways your organization can collaborate with us to drive change.',
    items: [
      { icon: 'fas fa-landmark', title: 'Government Institutions', text: 'Collaborating on national and local development priorities.' },
      { icon: 'fas fa-globe', title: 'International NGOs', text: 'Joint humanitarian and development programming.' },
      { icon: 'fas fa-hand-holding-heart', title: 'UN Agencies', text: 'Supporting coordinated, community-focused initiatives.' },
      { icon: 'fas fa-building', title: 'Corporate Partners', text: 'Investing in social responsibility and sustainable development.' },
      { icon: 'fas fa-hand-holding-usd', title: 'Foundations & Donors', text: 'Providing financial and technical support for impactful programs.' },
      { icon: 'fas fa-users', title: 'Community Organizations', text: 'Strengthening grassroots leadership and local ownership.' },
    ],
  },
  whatWeOffer: {
    subtitle: 'Why Partner',
    title: 'Why Partner with ERA-SS',
    description: 'Our partnerships are built on trust, accountability, and shared impact.',
    points: [
      { icon: 'fas fa-users', text: 'Strong community relationships across South Sudan' },
      { icon: 'fas fa-map-marked-alt', text: 'Local knowledge and contextual expertise' },
      { icon: 'fas fa-file-invoice-dollar', text: 'Transparent financial and program management' },
      { icon: 'fas fa-tasks', text: 'Experienced project implementation teams' },
      { icon: 'fas fa-chart-line', text: 'Regular monitoring, evaluation, and reporting' },
      { icon: 'fas fa-shield-alt', text: 'Commitment to safeguarding, inclusion, and accountability' },
    ],
    additional: [
      'Alignment with the Sustainable Development Goals (SDGs)',
      'Collaborative and long-term partnership approach',
    ],
  },
  cta: {
    title: 'Become a Partner Today',
    text: 'Join our network of change-makers and help us build a more equitable South Sudan. We welcome institutional donors, corporate partners, and foundations.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-partners');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-partners', JSON.stringify(body));
  return NextResponse.json({ success: true });
}