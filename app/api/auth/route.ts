import { NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { serialize } from 'cookie';
import { auth } from '@/lib/firebase'; // Tu instancia client ya inicializada

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    const response = NextResponse.json({ success: true });

    response.headers.set(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
      })
    );

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid login attempt' }, { status: 401 });
  }
}
