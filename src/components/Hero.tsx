interface HeroProps {
  pretitle?: string;
  title: string;
  subtitle?: string;
}

export default function Hero({ pretitle, title, subtitle }: HeroProps) {
  return (
    <section className="p-[3rem] min-h-[70vh] flex flex-col justify-end">
      {pretitle && (
        <p className="text-[clamp(1rem,4vw,1.5rem)] text-[var(--color-alt)] mb-4">
          <span className="mr-2">&mdash;</span>
          {pretitle}
        </p>
      )}
      <h1 className="text-[clamp(2.5rem,9vw,7.25rem)] font-serif italic font-light leading-[0.8] max-w-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 text-[clamp(1rem,4vw,1.9rem)] text-[var(--color-alt)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </section>
  );
}
