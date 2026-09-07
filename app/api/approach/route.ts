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
    title: 'Our Approach',
    subtitle: 'Innovative methods that empower communities and drive sustainable development across South Sudan.',
    backgroundImage: '/images/equity2.jpg',
  },
  intro: {
    subtitle: 'How We Work',
    title: "ERA-SS's Guiding Methodologies",
    description: "At ERA-SS, we believe that lasting change comes from within communities. That's why our approaches are participatory, evidence-based, and designed to build local ownership. We combine capacity building, peer education, meaningful youth engagement, and creative communication to tackle the root causes of inequality and fragility.",
  },
  methodologies: {
    subtitle: 'The Six Methodologies',
    title: 'Our Core Approaches',
    items: [
      {
        icon: 'fas fa-chart-line',
        title: 'Capacity Building',
        text: 'We develop young leaders through comprehensive training in leadership, research, advocacy, and communication. Our workshops and mentorship programmes equip individuals with the skills they need to drive change in their own communities.',
      },
      {
        icon: 'fas fa-users',
        title: 'Peer Education',
        text: 'Trained peer educators act as trusted messengers within their communities. They provide support, share vital information on health and rights, and create safe spaces where marginalized youth can network and thrive.',
      },
      {
        icon: 'fas fa-comments',
        title: 'Meaningful Youth Participation',
        text: 'Young people are not just beneficiaries—they are decision-makers. We integrate youth into programmatic design, policy dialogues, and institutional governance, ensuring their voices shape the future of South Sudan.',
      },
      {
        icon: 'fas fa-futbol',
        title: 'Sports & Arts for Development',
        text: 'We use sports and expressive arts as powerful tools to break down barriers. From football tournaments to drama and music, we create engaging platforms to discuss education, health, gender equality, and peacebuilding.',
      },
      {
        icon: 'fas fa-bullhorn',
        title: 'Media & Communications',
        text: 'Digital advocacy and social media are central to our work. We train youth in digital storytelling, run radio campaigns, and use online platforms to amplify community voices and influence policy.',
      },
      {
        icon: 'fas fa-wave-square',
        title: 'Youth Mobilization',
        text: 'Our Youth Mobilization approach channels the energy and creativity of young South Sudanese into collective action. It’s a dynamic network of changemakers driving inclusive development and preparing the next generation of leaders.',
      },
    ],
  },
  implementationProcess: {
    subtitle: 'How We Deliver',
    title: 'From Community Needs to Lasting Impact',
    description: 'Every ERA-SS project follows a structured process that ensures solutions are community-driven, inclusive, and sustainable.',
    steps: [
      { title: '1. Community Assessment', text: 'We work with communities to identify their priorities, challenges, and opportunities through consultations, surveys, and stakeholder engagement.' },
      { title: '2. Program Design', text: 'Together with local leaders and partners, we develop practical, evidence-based solutions tailored to each community’s needs.' },
      { title: '3. Implementation', text: 'Programs are delivered through trained staff, local volunteers, government institutions, and community partners.' },
      { title: '4. Monitoring & Evaluation', text: 'We continuously track progress, measure results, and gather community feedback to improve program quality.' },
      { title: '5. Sustainability', text: 'We strengthen local capacity so communities can continue benefiting from the program long after project completion.' },
    ],
  },
  principles: {
    subtitle: 'Values',
    title: 'Principles That Guide Every Program',
    description: 'Our work is grounded in principles that ensure every intervention is ethical, inclusive, and focused on long-term impact.',
    items: [
      { icon: 'fas fa-hand-holding-heart', title: 'Community Ownership', text: 'Communities actively shape decisions and lead local solutions.' },
      { icon: 'fas fa-balance-scale', title: 'Inclusion & Equality', text: 'We ensure women, youth, persons with disabilities, and marginalized groups have equal opportunities.' },
      { icon: 'fas fa-handshake', title: 'Partnership', text: 'We collaborate with government institutions, civil society, donors, and local organizations.' },
      { icon: 'fas fa-search-dollar', title: 'Transparency', text: 'We manage resources responsibly and remain accountable to our stakeholders.' },
      { icon: 'fas fa-lightbulb', title: 'Innovation', text: 'We embrace creative and evidence-based approaches to solve complex challenges.' },
      { icon: 'fas fa-sync-alt', title: 'Sustainability', text: 'We build local capacity to create lasting change.' },
    ],
  },
  whyItWorks: {
    subtitle: 'Impact',
    title: 'Creating Sustainable Change',
    description: 'Our approach is designed to strengthen communities rather than create dependency. By investing in local leadership, promoting collaboration, and building resilient systems, ERA-SS helps communities develop the knowledge, skills, and confidence needed to address today’s challenges and prepare for tomorrow’s opportunities.',
    items: [
      { icon: 'fas fa-users-cog', text: 'Community-led planning and implementation' },
      { icon: 'fas fa-handshake', text: 'Strong partnerships at local and national levels' },
      { icon: 'fas fa-people-arrows', text: 'Inclusive participation for all members of society' },
      { icon: 'fas fa-chart-bar', text: 'Evidence-based decision making' },
      { icon: 'fas fa-sync-alt', text: 'Continuous monitoring and learning' },
      { icon: 'fas fa-leaf', text: 'Long-term sustainability and resilience' },
    ],
  },
  cta: {
    title: "Let's Work Together",
    text: 'Our approaches are even stronger when combined with your support. Partner with us, volunteer, or donate to help us scale these methods and reach more communities.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-approach');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-approach', JSON.stringify(body));
  return NextResponse.json({ success: true });
}