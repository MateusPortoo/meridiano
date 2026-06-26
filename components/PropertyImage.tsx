"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/** Foto de imóvel com fallback: se o arquivo não existir, retorna null
 *  e o placeholder de gradiente atrás aparece. */
export function PropertyImage({ src, alt, className }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setFailed(true)} className={className} />
  );
}
