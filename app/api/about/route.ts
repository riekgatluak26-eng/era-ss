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
    title: 'About ERA-SS',
    subtitle: 'Our story, vision, and commitment to building an equitable South Sudan.',
    backgroundImage: '/images/equity.jpg',
  },
  history: {
    subtitle: 'Our Story',
    title: 'Who We Are & How We Began',
    paragraph1: 'Equity Resource Aid (ERA) is a non-profit national non-governmental organization founded and registered with the Relief and Rehabilitation Commission (RRC) of the Republic of South Sudan on 10th June 2026. We were established by a group of passionate South Sudanese professionals who saw the urgent need for a locally-led organization that could respond to the complex challenges facing our communities.',
    paragraph2: 'ERA was born out of a vision to create a platform where the voices of the most vulnerable are heard, and where resources are distributed equitably. We believe that lasting change comes from within communities, and our work is rooted in participatory approaches that empower local actors.',
    image: '/images/equity1.jpg',
  },
  visionMission: {
    visionTitle: 'Our Vision',
    visionText: 'Creating enabling opportunities for all people to achieve their needs, actively embracing continual social inclusion, change, and justice to take center stage in achieving optimum human development.',
    missionTitle: 'Our Mission',
    missionText: 'All citizens, regardless of their backgrounds, working together, uphold the peace and stability, and take the lead in fulfilling their talents and skills for a progressive change.',
  },
  coreValues: {
    subtitle: 'What Drives Us',
    title: 'Our Core Values',
    values: [
      { icon: 'fas fa-hand-holding-heart', title: 'Dignity', text: 'Every person deserves respect and inherent worth.' },
      { icon: 'fas fa-globe-africa', title: 'Respect for All', text: 'Honouring diversity and uniqueness.' },
      { icon: 'fas fa-balance-scale', title: 'Equality', text: 'Fair opportunities for everyone.' },
      { icon: 'fas fa-clipboard-check', title: 'Accountability', text: 'Transparent and responsible stewardship.' },
      { icon: 'fas fa-fire', title: 'Dedication', text: 'Unwavering commitment to our mission.' },
      { icon: 'fas fa-wheelchair', title: 'Inclusion', text: 'Leaving no one behind.' },
    ],
  },
  genesis: {
    subtitle: 'Our Genesis',
    title: 'Founded with Purpose',
    description: 'ERA was established to fill a critical gap in locally-led development. Our foundational aims and strategic objectives guide everything we do.',
    aimsTitle: '9 Foundational Aims',
    objectivesTitle: '10 Strategic Objectives',
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
  transparency: {
    subtitle: 'Commitment',
    title: 'Transparency & Accountability',
    description: 'We believe that trust is built on openness. Our stakeholders can count on us to be transparent in all our operations.',
    text: 'ERA-SS adheres to the highest standards of financial management, program monitoring, and reporting. We regularly share our progress with donors, communities, and the government to ensure mutual accountability.',
    commitments: [
      'Regular financial audits by independent firms',
      'Publicly available annual reports',
      'Community feedback mechanisms',
      'Zero tolerance for fraud and corruption',
      'Compliant with RRC regulations',
      'Protection of whistleblowers',
      'Gender and inclusion-sensitive programming',
      'Environmental sustainability in operations',
    ],
  },
  sdgs: {
    subtitle: 'Global Goals',
    title: 'SDGs We Support',
    description: 'Our work directly contributes to 7 Sustainable Development Goals, aligned with South Sudan\'s national priorities.',
    items: [
      { title: 'SDG 2 – Zero Hunger', text: 'Food security and sustainable agriculture.' },
      { title: 'SDG 3 – Good Health', text: 'Health and well-being for all.' },
      { title: 'SDG 4 – Quality Education', text: 'Inclusive and equitable education.' },
      { title: 'SDG 5 – Gender Equality', text: 'Empower women and girls.' },
      { title: 'SDG 6 – Clean Water', text: 'Water and sanitation for all.' },
      { title: 'SDG 13 – Climate Action', text: 'Combat climate change impacts.' },
      { title: 'SDG 16 – Peace, Justice', text: 'Promote peaceful and inclusive societies.' },
    ],
  },
  cta: {
    title: 'Be Part of the Change',
    text: 'Join us in our mission to build an equitable South Sudan. Partner, volunteer, or donate to support our work.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-about');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-about', JSON.stringify(body));
  return NextResponse.json({ success: true });
}