// Datei: app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

/**
 * Konfiguriert die NextAuth-API-Routen.
 * 
 * - GET: Authentifizierungsdaten abrufen.
 * - POST: Authentifizierungsaktionen ausführen.
 */
export const GET = async (request: Request) => {
    return NextAuth(authOptions)(request);
};

export const POST = async (request: Request) => {
    return NextAuth(authOptions)(request);
};
