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
    title: 'Get In Touch',
    subtitle: "We'd love to hear from you. Reach out and we'll respond promptly.",
    backgroundImage: '/images/equity3.jpg',
  },
  contactInfo: {
    title: 'Contact Information',
    responseNote: 'We respond within 2 hours.',
    address: 'Shirikat, Juba, Republic of South Sudan',
    phones: [
      '+211 927 757 777',
      '+211 928 118 089',
      '+211 922 503 888',
      '+211 927 036 669',
    ],
    email: 'info@era-ss.org',
    socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/people/Equity-Resource-Aid-South-Sudan/61590477338666/' },
      { platform: 'Instagram', url: 'https://www.instagram.com/equityresourceaid?igsh=MTRuMzd4bTc2azZmZA==' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/equity-resource-aid-south-sudan-45a908414' },
      { platform: 'WhatsApp', url: 'https://wa.me/211928118089' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps?q=Sherikat,+Juba,+South+Sudan&output=embed',
  },
  formSection: {
    subtitle: 'Send a Message',
    title: "We're Listening",
  },
  cta: {
    title: 'Become a Partner or Volunteer',
    text: "Whether you're an individual, corporation, or institution, there are many ways to get involved. Reach out and let's discuss how you can contribute.",
  },
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-contact-page');
  const data = raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('era-contact-page', JSON.stringify(body));
  return NextResponse.json({ success: true });
}