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
    title: 'Support ERA-SS',
    subtitle: 'Every contribution, no matter the size, brings hope and opportunity to communities across South Sudan.',
    backgroundImage: '/images/equity.jpg',
  },
  whySupport: {
    subtitle: 'Your Impact',
    title: 'Why Your Support Matters',
    description: 'Every contribution helps us work alongside communities to create lasting change across South Sudan. Whether supporting education, peacebuilding, livelihoods, or emergency response, your generosity enables vulnerable families to access opportunities, strengthen resilience, and build a brighter future.',
    points: [
      'Expand access to quality education',
      'Strengthen livelihoods and food security',
      'Promote peacebuilding and social cohesion',
      'Improve water, sanitation, and hygiene services',
      'Empower women and young people',
      'Build climate-resilient communities',
    ],
  },
  waysToGive: {
    subtitle: 'Ways to Give',
    title: 'How You Can Help',
    description: 'Choose the option that works best for you. Your generosity fuels our programs across South Sudan.',
    cards: [
      {
        icon: 'fas fa-hand-holding-usd',
        title: 'Financial Donation',
        text: 'Make a one-time or recurring donation via bank transfer or mobile money. Even a small amount can provide school supplies or clean water.',
        buttonLabel: 'See Options',
        buttonLink: '#donation-details',
        borderColor: 'var(--era-primary)',
      },
      {
        icon: 'fas fa-handshake',
        title: 'Strategic Partnership',
        text: 'Join us as a corporate or institutional partner. We design custom collaborations that align with your values and maximize impact.',
        buttonLabel: 'Contact Us',
        buttonLink: '/contact',
        borderColor: 'var(--era-secondary)',
      },
      {
        icon: 'fas fa-box-open',
        title: 'In-Kind & Volunteering',
        text: 'Donate goods, services, or your professional skills. From school materials to IT expertise, everything counts.',
        buttonLabel: 'Get Involved',
        buttonLink: '/contact',
        borderColor: '#555',
      },
    ],
  },
  donationDetails: {
    subtitle: 'Bank & Mobile Money',
    title: 'Make a Direct Deposit',
    description: 'You can transfer your contribution directly to our official bank account or via mobile money. Please include your name and "Donation" as the reference so we can acknowledge your gift.',
    bankInfo: {
      bankName: 'ECOBANK South Sudan',
      accountName: 'Equity Resource Aid',
      accountNumber: 'Official banking details provided upon request',
      swiftCode: 'ECOCSSJB',
    },
    mobileMoney: [
      { provider: 'MTN Mobile Money', number: '+211 927 757 777 (Registered as ERA-SS)' },
      { provider: 'Zain Cash', number: '+211 928 118 089' },
    ],
    image: '/images/equity2.jpg',
    imageCaption: 'Your support transforms lives in South Sudan',
  },
  impact: {
    subtitle: 'Your Donation at Work',
    title: 'What Your Gift Can Do',
    items: [
      { icon: 'fas fa-pencil-alt', text: 'Support learning materials for children' },
      { icon: 'fas fa-seedling', text: 'Strengthen community livelihoods' },
      { icon: 'fas fa-dove', text: 'Facilitate peacebuilding initiatives' },
      { icon: 'fas fa-users', text: 'Expand youth empowerment programs' },
    ],
  },
  transparency: {
    subtitle: 'Trust',
    title: 'Every Donation Makes an Impact',
    description: 'ERA-SS is committed to responsible stewardship of every contribution we receive. We strive to ensure that funds are used efficiently, ethically, and in line with our mission to serve communities across South Sudan.',
    points: [
      'Responsible financial management',
      'Transparent reporting',
      'Regular monitoring of funded activities',
      'Ethical governance',
      'Accountability to donors, partners, and communities',
    ],
  },
  otherWays: {
    subtitle: 'Beyond Giving',
    title: 'Get Involved Beyond Donating',
    description: 'Not everyone can donate money — you can still make a difference.',
    items: [
      { icon: 'fas fa-user-plus', title: 'Become a Volunteer', text: 'Share your skills and time to strengthen our programs.' },
      { icon: 'fas fa-handshake', title: 'Partner With Us', text: 'Collaborate as a business, NGO, donor, or institution.' },
      { icon: 'fas fa-bullhorn', title: 'Fundraise', text: 'Organize fundraising campaigns within your school, workplace, or community.' },
      { icon: 'fas fa-share-alt', title: 'Advocate', text: 'Help raise awareness by sharing our mission and encouraging others to support equitable development in South Sudan.' },
    ],
  },
  cta: {
    title: 'Ready to Make a Difference?',
    text: 'Join the hundreds of supporters who power ERA-SS every day. Together, we can break the cycle of poverty and build a brighter future for all South Sudanese.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-support');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-support', JSON.stringify(body));
  return NextResponse.json({ success: true });
}