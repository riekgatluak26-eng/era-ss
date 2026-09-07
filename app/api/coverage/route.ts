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
    title: 'Where We Work',
    subtitle: 'Operating across all 10 states of South Sudan, reaching the most vulnerable communities.',
    backgroundImage: '/images/equity1.jpg',
  },
  coverageDetails: {
    subtitle: 'Coverage',
    title: 'Working Nationwide',
    paragraph1: 'We operate nation-wide, collaborating with community and youth-led NGOs, networks and changemakers as well as working with the government\'s existing structures and systems to reach the most vulnerable and marginalized groups.',
    paragraph2: 'Our work contributes towards the Sustainable Development Goals (2, 3, 4, 5, 6, 13, and 16), the South Sudan Growth Development Strategy and South Sudan Vision 2030.',
    stats: [
      { value: '8', label: 'States' },
      { value: '7', label: 'SDGs' },
      { value: 'Nationwide', label: 'Reach' },
    ],
    image: '/images/equity1.jpg',
  },
  presence: {
    subtitle: 'Our Footprint',
    title: 'Our Presence Across South Sudan',
    description: 'ERA-SS works in partnership with local communities, civil society organizations, and government institutions across all 8 states. Our programs are tailored to the unique needs and priorities of each state, ensuring locally driven and sustainable solutions.',
    states: [
      { name: 'Central Equatoria', focus: 'Governance, Education, Youth Empowerment' },
      { name: 'Jonglei', focus: 'Humanitarian Assistance, Child Protection' },
      { name: 'Unity', focus: 'Peacebuilding, Recovery, Livelihoods' },
      { name: 'Upper Nile', focus: 'Emergency Response, Health, WASH' },
      { name: 'Lakes', focus: 'Community Development, Education' },
      { name: 'Warrap', focus: 'Youth Empowerment, Gender Equality' },
      { name: 'Northern Bahr el Ghazal', focus: 'Food Security, Education' },
      { name: 'Western Bahr el Ghazal', focus: 'Livelihoods, Community Resilience' },
    ],
  },
  howWeWork: {
    subtitle: 'Implementation Approach',
    title: 'Delivering Impact Through Local Partnerships',
    description: 'ERA-SS believes sustainable development begins with communities. We work closely with local leaders, community-based organizations, youth groups, women\'s associations, government institutions, and development partners to design and implement programs that respond to local needs.',
    items: [
      { icon: 'fas fa-users', title: 'Community Participation & Ownership' },
      { icon: 'fas fa-chart-bar', title: 'Evidence-Based Planning' },
      { icon: 'fas fa-balance-scale', title: 'Inclusive & Equitable Service Delivery' },
      { icon: 'fas fa-graduation-cap', title: 'Capacity Strengthening for Local Institutions' },
      { icon: 'fas fa-sync-alt', title: 'Sustainable & Long-Term Development' },
    ],
  },
  programReach: {
    subtitle: 'Our Scale',
    title: 'Expanding Our Reach',
    stats: [
      { value: '8', label: 'States Covered' },
      { value: '34+', label: 'Counties & Communities' },
      { value: 'Multiple', label: 'Development Sectors' },
      { value: 'Thousands', label: 'People Reached' },
      { value: 'National', label: 'Local Partnerships' },
      { value: 'fas fa-users', label: 'Community‑Led Implementation' },
    ],
    note: 'Figures are indicative and updated as our monitoring data grows.',
  },
  cta: {
    title: 'Ready to Make a Difference?',
    text: 'Join forces with ERA-SS to extend our reach and deepen our impact in every corner of South Sudan.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-coverage');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-coverage', JSON.stringify(body));
  return NextResponse.json({ success: true });
}