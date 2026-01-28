import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { pin } = (await request.json()) as { pin: string };

  if (pin === process.env.AUTH_PIN) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth', 'true', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
}
