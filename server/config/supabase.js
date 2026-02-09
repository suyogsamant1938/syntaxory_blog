import { createClient } from '@supabase/supabase-js';

// Create Supabase client using service role key
// On Vercel, these are injected via process.env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Export configured client
export default supabase;