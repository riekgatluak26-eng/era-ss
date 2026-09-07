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
    title: 'Empowering with Equality',
    slides: [
      { image: '/assets/equity.jpg', alt: 'Community gathering in South Sudan' },
      { image: '/assets/equity1.jpg', alt: 'ERA-SS field work' },
      { image: '/assets/equity2.jpg', alt: 'ERA-SS community engagement' },
      { image: '/assets/equity3.jpg', alt: 'ERA-SS program activity' },
      { image: '/assets/equity4.jpg', alt: 'ERA-SS program activity' },
      { image: '/assets/equity5.jpg', alt: 'ERA-SS program activity' },
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
    image: '/assets/equity.jpg',
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
    image: '/assets/equity1.jpg',
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
      { src: '/assets/partner11.png', alt: 'UNICEF' },
      { src: '/assets/partner2.png', alt: 'UNHCR' },
      { src: '/assets/partner3.png', alt: 'WFP' },
      { src: '/assets/partner4.png', alt: 'UNDP' },
      { src: '/assets/partner5.png', alt: 'WHO' },
      { src: '/assets/partner6.png', alt: 'UNFPA' },
      { src: '/assets/partner10.png', alt: 'GIZ' },
      { src: '/assets/partner8.png', alt: 'USAID' },
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

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-homepage');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-homepage', JSON.stringify(body));
  return NextResponse.json({ success: true });
}