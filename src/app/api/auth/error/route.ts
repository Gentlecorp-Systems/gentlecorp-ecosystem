export const dynamic = 'force-dynamic'; // Für dynamische Routen

import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const error = url.searchParams.get('error');

  // Fehlermeldungen definieren
  const errorMessages: { [key: string]: string } = {
    'Invalid credentials': 'Invalid username or password.',
    CredentialsSignin: 'Invalid username or password.',
    NoUser: 'No user found with the provided username.',
    InvalidCredentials: 'Invalid credentials provided.',
    default: 'An unknown error occurred.',
  };

  const errorMessage =
    errorMessages[error as string] || errorMessages['default'];

  redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
}
