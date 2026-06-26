/**
 * Vídeo de fundo para heros. Renderiza:
 * 1. fallback de gradiente (aparece se o vídeo não existir)
 * 2. o vídeo em loop, mudo, cobrindo a área
 * 3. overlay escuro para legibilidade do texto
 *
 * O vídeo deve ficar em public/videos/<arquivo>.mp4
 */
export function HeroVideoBackground({ src }: { src: string }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, var(--color-forest) 0%, var(--color-forest-deep) 100%)",
        }}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />
    </>
  );
}
