type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="border-b border-border pb-10">
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-4xl tracking-tight text-fg sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
