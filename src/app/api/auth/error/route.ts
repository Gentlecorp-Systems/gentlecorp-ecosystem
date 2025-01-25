// app/api/auth/error/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const error = url.searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    'Invalid credentials': 'Invalid username or password.',
    CredentialsSignin: 'Invalid username or password.',
    NoUser: 'No user found with the provided username.',
    InvalidCredentials: 'Invalid credentials provided.',
    default: 'An unknown error occurred.',
  };

  const errorMessage =
    errorMessages[error as string] || errorMessages['default'];

  return NextResponse.json({ error: errorMessage });
}
