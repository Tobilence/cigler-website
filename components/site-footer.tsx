type Props = {
  name: string | null;
  email: string | null;
};

export function SiteFooter({ name, email }: Props) {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>
          © {new Date().getFullYear()} {name ?? "Johann Cigler"}. Fakultät für
          Mathematik, Universität Wien.
        </p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-muted transition-colors hover:text-fg"
          >
            {email}
          </a>
        )}
      </div>
    </footer>
  );
}
