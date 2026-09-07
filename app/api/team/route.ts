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
    title: 'Our Team',
    subtitle: 'Meet the passionate people behind ERA-SS.',
    backgroundImage: '/images/equity5.jpg',
  },
  intro: {
    subtitle: 'Leadership & Staff',
    title: 'Driven by Purpose, United by Mission',
    description: 'Our diverse team brings together expertise from humanitarian, development, and community-based backgrounds. Together, we are committed to serving the people of South Sudan with integrity and dedication.',
  },
  members: [
    {
      initials: 'BA',
      name: 'Bakhita Aluel Deng',
      role: 'Executive Director',
      bio: 'Bakhita leads the organization with a vision for inclusive development and a passion for community empowerment.',
      photo: '',
    },
    {
      initials: 'LD',
      name: 'Liel Deng Liel',
      role: 'Program Manager',
      bio: 'Liel oversees program implementation, ensuring projects are responsive to community needs and delivered with quality.',
      photo: '',
    },
    {
      initials: 'MT',
      name: 'Magar Thomas Dut',
      role: 'Head of Programs',
      bio: 'Magar coordinates all programmatic activities, ensuring alignment with ERA-SS\'s strategic goals and donor requirements.',
      photo: '',
    },
    {
      initials: 'DM',
      name: 'Deng James Manot',
      role: 'FSL Manager',
      bio: 'Deng leads food security and livelihoods interventions, supporting communities to build resilient agricultural systems.',
      photo: '',
    },
    {
      initials: 'JA',
      name: 'James Yel Atiik',
      role: 'Communications & Information Officer',
      bio: 'James manages external communications, digital media, and information management to amplify ERA-SS\'s impact.',
      photo: '',
    },
    {
      initials: 'AM',
      name: 'Amiir Achor Mayar',
      role: 'Board Member (Ordinary)',
      bio: 'Amiir brings strategic oversight and governance expertise to the ERA-SS board, guiding the organization\'s long-term direction.',
      photo: '',
    },
    {
      initials: 'AM',
      name: 'Anyang Ayom Majok',
      role: 'Board Member (Ordinary)',
      bio: 'Anyang contributes to the board\'s oversight and policy development, ensuring accountability and good governance.',
      photo: '',
    },
  ],
  cta: {
    title: 'Join Our Team',
    text: "We're always looking for passionate individuals to help drive our mission forward.",
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-team');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-team', JSON.stringify(body));
  return NextResponse.json({ success: true });
}