// A área administrativa é privada e depende de dados em tempo real,
// portanto nunca deve ser gerada estaticamente no build.
export const dynamic = "force-dynamic";

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
