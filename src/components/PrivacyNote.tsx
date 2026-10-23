import Link from "next/link";

/** Aviso curto, ao lado dos botões de candidatura, com o link da Política de Privacidade. */
export default function PrivacyNote({
  className = "",
  linkClassName = "underline",
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <p className={className}>
      Ao se candidatar, você declara ciência da nossa{" "}
      <Link href="/privacidade" className={linkClassName}>
        Política de Privacidade
      </Link>
      .
    </p>
  );
}
