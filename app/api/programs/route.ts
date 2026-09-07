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
    title: 'Our Programs',
    subtitle: 'Seven integrated thematic areas driving equitable development across South Sudan.',
    backgroundImage: '/images/equity3.jpg',
  },
  intro: {
    subtitle: 'Programmatic Focus',
    title: 'Seven Thematic Areas',
    description: 'ERA-SS implements a holistic approach that addresses the root causes of vulnerability and inequality. Our programs are interconnected, each reinforcing the other to create sustainable and lasting change.',
  },
  thematicAreas: {
    subtitle: 'Thematic Areas',
    title: 'What We Do',
    items: [
      {
        icon: 'fas fa-graduation-cap',
        title: 'Education',
        text: 'We improve access to quality learning for children and youth, especially girls and those in crisis-affected areas. Activities include teacher training, provision of learning materials, construction of temporary learning spaces, and inclusive education programs.',
      },
      {
        icon: 'fas fa-seedling',
        title: 'Agriculture & Livelihood',
        text: 'We support communities with climate-smart farming techniques, vocational skills training, and small enterprise development. Our goal is to reduce food insecurity and create sustainable income opportunities.',
      },
      {
        icon: 'fas fa-dove',
        title: 'Peacebuilding & Advocacy',
        text: 'Through dialogue, reconciliation workshops, and community-led peace initiatives, we foster social cohesion. Our advocacy work amplifies local voices to influence policy at national and international levels.',
      },
      {
        icon: 'fas fa-users',
        title: 'Youth Empowerment',
        text: 'We equip young people with leadership, digital, and life skills. Our youth networks and innovation hubs provide safe spaces for personal growth and civic engagement.',
      },
      {
        icon: 'fas fa-shield-alt',
        title: 'General Protection',
        text: 'We prioritize the safety and well-being of vulnerable groups including women, children, the elderly, and persons with disabilities. Our protection activities include case management, psychosocial support, and referrals.',
      },
      {
        icon: 'fas fa-venus-mars',
        title: 'Gender Equality',
        text: 'We tackle gender-based violence and discrimination by empowering women economically, promoting women’s leadership, and engaging men and boys as allies. Gender equality is integrated across all our programs.',
      },
      {
        icon: 'fas fa-tree',
        title: 'Climate Resilience',
        text: 'Communities are at the forefront of climate adaptation. We promote conservation, reforestation, sustainable agriculture, and disaster risk reduction to build resilience against floods, droughts, and other climate shocks.',
      },
    ],
  },
  programApproach: {
    subtitle: 'How We Deliver',
    title: 'Delivering Sustainable Impact',
    description: 'At ERA-SS, our programs are designed to respond to the real needs of communities while creating long-term, sustainable change. We work closely with local leaders, government institutions, community-based organizations, women, youth, and development partners to ensure every intervention is inclusive, locally owned, and evidence-based.',
    items: [
      { icon: 'fas fa-users', title: 'Community-Led', text: 'Communities actively participate in identifying priorities, designing solutions, and implementing projects.' },
      { icon: 'fas fa-chart-bar', title: 'Evidence-Based', text: 'Programs are guided by research, assessments, and continuous monitoring to maximize impact.' },
      { icon: 'fas fa-hand-holding-heart', title: 'Inclusive', text: 'We ensure women, children, youth, persons with disabilities, and other vulnerable groups are fully included.' },
      { icon: 'fas fa-sync-alt', title: 'Sustainable', text: 'We strengthen local capacity so communities can continue benefiting long after projects are completed.' },
    ],
  },
  impact: {
    subtitle: 'Our Impact',
    title: 'Numbers that Speak',
    stats: [
      { value: '2,500+', label: 'Children enrolled in education programs' },
      { value: '1,200', label: 'Farmers trained in climate-smart agriculture' },
      { value: '1,600', label: 'Youth leaders empowered' },
      { value: '200+', label: 'Peace dialogues facilitated' },
    ],
  },
  crossCutting: {
    subtitle: 'Integrated Principles',
    title: 'Cross-Cutting Themes',
    description: 'Every ERA-SS program integrates key principles that strengthen effectiveness and ensure no one is left behind.',
    items: [
      { icon: 'fas fa-venus-mars', title: 'Gender Equality' },
      { icon: 'fas fa-wheelchair', title: 'Disability Inclusion' },
      { icon: 'fas fa-child', title: 'Child Protection' },
      { icon: 'fas fa-leaf', title: 'Environmental Sustainability' },
      { icon: 'fas fa-users', title: 'Community Participation' },
      { icon: 'fas fa-clipboard-check', title: 'Accountability to Affected Populations' },
    ],
  },
  partnerships: {
    subtitle: 'Collaboration',
    title: 'Working Through Partnerships',
    paragraph1: 'ERA-SS collaborates with government institutions, community-based organizations, civil society, local leaders, national and international NGOs, development partners, and the private sector to deliver impactful and sustainable programs across South Sudan.',
    paragraph2: 'We believe that strong partnerships enhance local capacity, promote innovation, and maximize the long-term impact of our interventions.',
    image: '/images/equity4.jpg',
  },
  measuringSuccess: {
    subtitle: 'Accountability',
    title: 'Measuring Our Impact',
    description: 'We continuously monitor, evaluate, and learn from our programs to ensure resources are used effectively and communities experience meaningful, lasting improvements.',
    metrics: [
      { icon: 'fas fa-users', label: 'People reached' },
      { icon: 'fas fa-building', label: 'Communities supported' },
      { icon: 'fas fa-school', label: 'Schools & learning spaces improved' },
      { icon: 'fas fa-tractor', label: 'Farmers & entrepreneurs trained' },
      { icon: 'fas fa-dove', label: 'Peacebuilding initiatives completed' },
      { icon: 'fas fa-female', label: 'Women & youth empowered' },
      { icon: 'fas fa-tree', label: 'Environmental restoration activities' },
      { icon: 'fas fa-comments', label: 'Community feedback & satisfaction' },
    ],
  },
  cta: {
    title: 'Support Our Programs',
    text: 'Your contribution helps us expand these life-changing programs to more communities across South Sudan.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-programs');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-programs', JSON.stringify(body));
  return NextResponse.json({ success: true });
}