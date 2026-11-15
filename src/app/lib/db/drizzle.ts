import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or POSTGRES_URL environment variable is not set');
}

// Diagnostic check to catch common password formatting mistakes without exposing secrets
try {
  const parsed = new URL(connectionString);
  if (parsed.password.startsWith('[') && parsed.password.endsWith(']')) {
    console.error(
      '⚠️ DATABASE CONFIG ERROR: The database password includes literal square brackets [ and ]. ' +
      'Please remove the brackets in your environment variable!'
    );
  }
} catch {
  // Ignore URL parse errors here; let postgres client handle invalid strings
}

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
