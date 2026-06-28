import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types.js';

let _client: SupabaseClient<Database> | null = null;

export function initSupabase(url: string, anonKey: string): void {
  if (!url || !anonKey) {
    console.warn('[core] initSupabase: URL or anon key is empty — data fetching will fail.');
    return;
  }
  _client = createClient<Database>(url, anonKey);
}

export function getSupabase(): SupabaseClient<Database> {
  if (_client === null) {
    throw new Error('[core] Supabase not initialized. Call initSupabase(url, key) first.');
  }
  return _client;
}
