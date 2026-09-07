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
    title: 'FAQs',
    subtitle: 'Everything you need to know about Equity Resource Aid – South Sudan.',
    backgroundImage: '/images/equity4.jpg',
  },
  faqContent: {
    subtitle: 'Quick Answers',
    title: 'How We Operate',
    description: 'Find answers to the most common questions about our mission, programs, and ways you can get involved.',
    items: [
      {
        icon: 'fas fa-building',
        question: 'What is ERA-SS?',
        answer: 'Equity Resource Aid – South Sudan (ERA-SS) is a registered national non-governmental organization founded on 10th June 2026. We work to empower communities through equitable access to education, livelihoods, peacebuilding, protection, youth empowerment, gender equality, and climate resilience across all 10 states of South Sudan.',
      },
      {
        icon: 'fas fa-bullseye',
        question: "What is ERA's mission?",
        answer: 'All citizens, regardless of their backgrounds, working together, uphold the peace and stability, and take the lead in fulfilling their talents and skills for a progressive change. We aim to create enabling opportunities for everyone to achieve their needs.',
      },
      {
        icon: 'fas fa-map-marked-alt',
        question: 'Where does ERA work?',
        answer: 'We operate in all 10 states of South Sudan—from the capital Juba to remote rural areas. Our field teams work directly with communities, local partners, and government structures.',
      },
      {
        icon: 'fas fa-hand-holding-heart',
        question: 'How can I donate or support ERA?',
        answer: 'You can support us by visiting our Support page or contacting us directly. We accept financial donations, in-kind contributions, and volunteer expertise. Every contribution helps us reach more vulnerable communities.',
      },
      {
        icon: 'fas fa-users',
        question: 'Can I volunteer with ERA?',
        answer: 'Absolutely! We welcome volunteers with diverse skills. Visit our Contact page and send us a message outlining your interests and experience. We’ll connect you with opportunities that match your expertise.',
      },
      {
        icon: 'fas fa-file-invoice-dollar',
        question: 'How is ERA funded?',
        answer: 'ERA-SS is funded through grants, partnerships, donations, and contributions from individuals, organizations, and development partners. We are committed to transparent financial management and responsible stewardship of all resources.',
      },
      {
        icon: 'fas fa-shield-alt',
        question: 'How does ERA ensure transparency and accountability?',
        answer: 'ERA-SS is committed to transparency, ethical governance, responsible financial management, and regular monitoring of our programs. We strive to ensure that all resources are used effectively and in the best interests of the communities we serve.',
      },
      {
        icon: 'fas fa-handshake',
        question: 'How can my organization partner with ERA?',
        answer: 'We’re always looking for strategic partnerships. Reach out via our Contact page or email contact@era-ss.org. We’ll explore synergies in program implementation, advocacy, and resource mobilization.',
      },
      {
        icon: 'fas fa-briefcase',
        question: 'Does ERA offer job opportunities?',
        answer: 'Yes, we regularly post vacancies on our Careers page. Check back often or follow our social media channels for the latest openings.',
      },
      {
        icon: 'fas fa-child',
        question: 'How do you protect children and vulnerable adults?',
        answer: 'Safeguarding is at the heart of everything we do. We have a strict Child Protection Policy and Code of Conduct that all staff and partners must follow. We also provide training and reporting mechanisms to prevent and respond to any form of abuse.',
      },
    ],
  },
  resources: {
    subtitle: 'Documents',
    title: 'Helpful Resources',
    description: 'Looking for more information? Explore our policies, reports, and organizational documents to learn more about how ERA-SS operates and delivers impact.',
    items: [
      { icon: 'fas fa-file-alt', title: 'Annual Reports', text: 'Review our yearly progress and impact.', link: '/report' },
      { icon: 'fas fa-compass', title: 'Strategic Plan', text: 'Our roadmap for the future.', link: '/report' },
      { icon: 'fas fa-shield-alt', title: 'Safeguarding Policy', text: 'Available upon request.', link: '/contact' },
      { icon: 'fas fa-child', title: 'Child Protection Policy', text: 'Available upon request.', link: '/contact' },
      { icon: 'fas fa-file-contract', title: 'Code of Conduct', text: 'Available upon request.', link: '/contact' },
      { icon: 'fas fa-chart-pie', title: 'Financial Reports', text: 'Transparency in numbers.', link: '/report' },
    ],
  },
  getInTouch: {
    subtitle: 'Still need help?',
    title: 'Get in Touch',
    description: "If you can't find the answer you're looking for, our team is ready to assist you.",
    email: 'contact@era-ss.org',
    phones: ['+211 927 757 777', '+211 928 118 089'],
    address: 'Shirikat, Juba, South Sudan',
    responseNote: 'We aim to respond to all enquiries within 1–2 business days.',
  },
  cta: {
    title: 'Support Our Mission',
    text: 'Your contribution helps us answer more questions and reach more communities.',
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-faq');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-faq', JSON.stringify(body));
  return NextResponse.json({ success: true });
}