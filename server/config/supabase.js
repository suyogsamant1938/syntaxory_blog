import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Create Supabase client using service role key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Export configured client
export default supabase;