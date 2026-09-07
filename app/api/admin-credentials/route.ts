import { NextResponse } from 'next/server';
import { createClient } from 'redis';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

const defaultCredentials = {
  username: 'equity',
  password: 'erass2026',
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('era-admin-credentials');
  if (!raw) {
    // Seed default if not exists
    await client.set('era-admin-credentials', JSON.stringify(defaultCredentials));
    return NextResponse.json(defaultCredentials);
  }
  const credentials = JSON.parse(raw);
  return NextResponse.json(credentials);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }
  const client = await getClient();
  const credentials = { username, password };
  await client.set('era-admin-credentials', JSON.stringify(credentials));
  return NextResponse.json({ success: true });
}