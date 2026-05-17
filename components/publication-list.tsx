import { resolveLink } from "@/sanity/lib/links";
import type { Publication } from "@/sanity/lib/types";

type Props = {
  publications: Publication[];
};

const dateFormatter = new Intl.DateTimeFormat("de-AT", {
  year: "numeric",
  month: "long",
});

function formatDate(date: string | null | undefined) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return dateFormatter.format(parsed);
}

export function PublicationList({ publications }: Props) {
  if (!publications.length) {
    return (
      <p className="mt-8 text-muted">Noch keine Eintr&auml;ge vorhanden.</p>
    );
  }

  return (
    <ol className="mt-10 divide-y divide-border">
      {publications.map((pub) => {
        const link = resolveLink(pub);
        const formattedDate = formatDate(pub.date);
        return (
          <li key={pub._id} className="py-6">
            {formattedDate && (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                <time dateTime={pub.date ?? undefined}>{formattedDate}</time>
              </p>
            )}
            <h3 className="mt-1 font-serif text-lg leading-snug text-fg">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {pub.headline}
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
                pub.headline
              )}
            </h3>
            {pub.details && (
              <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted">
                {pub.details}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
