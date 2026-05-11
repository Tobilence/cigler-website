import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { LECTURE_NOTES_QUERY } from "@/sanity/lib/queries";
import type { LectureNote } from "@/sanity/lib/types";

export const metadata = {
  title: "Skripten · Johann Cigler",
};

export default async function SkriptenPage() {
  const notes = await sanityFetch<LectureNote[]>({
    query: LECTURE_NOTES_QUERY,
    tags: ["lectureNote"],
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Vorlesungsskripten"
        title="Skripten"
        description="Folgende Vorlesungsskripten können heruntergeladen werden. Die Zahl nach der Kapitelnummer gibt die jeweilige Version an. Die einzelnen Kapitel werden laufend korrigiert."
      />
      <ul className="mt-10 divide-y divide-border">
        {notes.map((note) => {
          const primaryHref = note.url ?? note.fileUrl ?? null;
          const isPdfPrimary = !note.url && !!note.fileUrl;

          const titleContent = (
            <>
              {note.title}
              {note.version && (
                <span className="ml-2 font-mono text-sm text-muted">
                  v{note.version}
                </span>
              )}
              {note.fileUrl && (
                <span
                  className="ml-2 align-middle font-mono text-[10px] uppercase tracking-wider text-accent"
                  aria-label="PDF available"
                >
                  PDF
                </span>
              )}
            </>
          );

          return (
            <li key={note._id} className="py-5">
              <h3 className="font-serif text-lg leading-snug text-fg">
                {primaryHref ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(isPdfPrimary ? { download: true } : {})}
                    className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {titleContent}
                  </a>
                ) : (
                  titleContent
                )}
              </h3>
              {note.url && note.fileUrl && (
                <p className="mt-1 text-xs">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="font-mono uppercase tracking-wider text-accent underline-offset-4 hover:underline"
                  >
                    PDF herunterladen
                  </a>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
