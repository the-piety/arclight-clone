"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CharacterPage() {
  const params = useParams();
  const supabase = createClient();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacter() {
      const { data, error: fetchError } = await supabase
        .from("characters")
        .select("*")
        .eq("id", params.id)
        .single();

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setCharacter(data);
      }
      setLoading(false);
    }

    loadCharacter();
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-slate-400">Loading character...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  const healthPercent = Math.round(
    (character.health / character.max_health) * 100
  );

  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-sm mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">
            {character.name}
          </h1>
          <p className="text-slate-400 text-sm">Level {character.level}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Health</span>
            <span className="text-slate-200">
              {character.health} / {character.max_health}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-red-500"
              style={{ width: `${healthPercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 flex justify-between">
          <span className="text-slate-400">Currency</span>
          <span className="text-yellow-400 font-semibold">
            {character.currency} ¥
          </span>
        </div>
      </div>
    </main>
  );
}
