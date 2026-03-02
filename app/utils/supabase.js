import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://notrpbtonphtccjhajkk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdHJwYnRvbnBodGNjamhhamtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODAwNzMsImV4cCI6MjA4ODA1NjA3M30.lvb3yoFla7IMbVTzZYeW_kHuPKbi535Ly5j1InGUHZY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
