// app/api/login/route.ts.

import { NextResponse } from 'next/server';

// Sample users (in a real-world app, fetch from a database)
const users = [
  {. 
    email: 'user@example.com',
    password: 'password123', // In real-world apps, you should hash passwords
  },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Check if user exists and credentials are correct
  const user = users.find((user) => user.email === email);

  if (user && user.password === password) {
    return NextResponse.json({ token: 'mock-jwt-token' });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
