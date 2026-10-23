import PublicBase from "@/components/PublicBase";

export default function PrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicBase />
      {children}
    </>
  );
}
