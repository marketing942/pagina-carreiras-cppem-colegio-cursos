"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Nome do evento enviado ao Analytics ao clicar (ex.: "candidatar"). */
  event: string;
  eventProps?: Record<string, string | number | boolean>;
};

/** Link comum que também registra o clique no Analytics. */
export default function TrackedLink({ event, eventProps, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
