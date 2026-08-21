// This client runs in the BROWSER (inside React components with "use client")
// Think of this like a RemoteEvent connection in Roblox - it's how the
// frontend talks to the backend (Supabase) to read/write player data.

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
