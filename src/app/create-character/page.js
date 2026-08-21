"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateCharacter() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const supabase = createClient();

  async function handleCreate() {
    if (!name.trim()) {
      setError("Enter a character name first.");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("characters")
      .insert({ name: name.trim() })
      .select()
      .single();

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    router.push(`/character/${data.id}`);
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-cyan-400">Arclight City</h1>
          <p className="text-slate-400 text-sm">
            Choose a name for your character
          </p>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Character name"
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold py-3 transition"
        >
          {loading ? "Creating..." : "Enter the City"}
        </button>
      </div>
    </main>
  );
            }
