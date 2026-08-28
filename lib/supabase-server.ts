import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the service role key. This bypasses Row
 * Level Security, so it must never be imported from a Client Component and
 * the key must never be sent to the browser (hence the plain, non
 * NEXT_PUBLIC_ env var name).
 *
 * Untyped on purpose: hand-writing a Database generic against
 * @supabase/supabase-js's select-string type parser is brittle across
 * versions. lib/data.ts is the single place that talks to this client and
 * its exported functions carry the real, hand-checked types the rest of the
 * app relies on.
 */
export function supabaseServer(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
