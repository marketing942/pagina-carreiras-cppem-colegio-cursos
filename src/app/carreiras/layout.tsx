import PublicBase from "@/components/PublicBase";

export default function CarreirasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicBase />
      {children}
    </>
  );
}
