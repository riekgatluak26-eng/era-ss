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

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-reports');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-reports', JSON.stringify(body));
  return NextResponse.json({ success: true });
}