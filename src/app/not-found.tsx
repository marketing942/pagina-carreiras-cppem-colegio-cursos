import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-950 px-4 text-center text-white">
      <p className="text-6xl font-black text-accent-500">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-brand-200">
        A vaga ou página que você procura não está disponível.
      </p>
      <Link href="/carreiras" className="btn-primary mt-6">
        Ver vagas abertas
      </Link>
    </main>
  );
}
