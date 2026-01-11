import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Supabase URL or Anon Key is missing! Check your .env file.');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Defined' : 'Missing');
} else if (!supabaseUrl.startsWith('https://')) {
  console.error('ERROR: VITE_SUPABASE_URL must start with "https://"');
  console.error('Current URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

