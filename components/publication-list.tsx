import { resolveLink } from "@/sanity/lib/links";
import type { Publication } from "@/sanity/lib/types";

type Props = {
  publications: Publication[];
  showLabel?: boolean;
};

export function PublicationList({ publications, showLabel = true }: Props) {
  if (!publications.length) {
    return (
      <p className="mt-8 text-muted">Noch keine Eintr&auml;ge vorhanden.</p>
    );
  }

  return (
    <ol className="mt-10 divide-y divide-border">
      {publications.map((pub) => {
        const link = resolveLink(pub);
        return (
          <li key={pub._id} className="group py-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              {showLabel && pub.label && (
                <span className="shrink-0 font-mono text-sm uppercase tracking-wider text-muted sm:w-16">
                  {pub.label}
                </span>
              )}
              <div className="flex-1">
                <h3 className="font-serif text-lg leading-snug text-fg">
                  {pub.authors && (
                    <span className="text-muted">({pub.authors}) </span>
                  )}
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {pub.title}
                      {pub.fileUrl && (
                        <span
                          className="ml-2 align-middle font-mono text-[10px] uppercase tracking-wider text-accent"
                          aria-label="PDF available"
                        >
                          PDF
                        </span>
                      )}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>
                {pub.citation && (
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {pub.citation}
                  </p>
                )}
                {pub.identifier && (
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {pub.identifier}
                      </a>
                    ) : (
                      pub.identifier
                    )}
                  </p>
                )}
                {pub.notes && (
                  <p className="mt-2 text-sm italic text-muted">{pub.notes}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
