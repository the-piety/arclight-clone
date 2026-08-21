import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-cyan-400">Arclight City</h1>
        <p className="text-slate-400">A cyberpunk text RPG</p>
        <Link
          href="/create-character"
          className="inline-block rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-3 transition"
        >
          Create Character
        </Link>
      </div>
    </main>
  );
}
