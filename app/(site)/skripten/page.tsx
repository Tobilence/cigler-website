import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { resolveLink } from "@/sanity/lib/links";
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
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Vorlesungsskripten"
        title="Skripten"
        description="Folgende Vorlesungsskripten können heruntergeladen werden. Die Zahl nach der Kapitelnummer gibt die jeweilige Version an. Die einzelnen Kapitel werden laufend korrigiert."
      />
      <ul className="mt-10 divide-y divide-border">
        {notes.map((note) => {
          const link = resolveLink(note);
          const content = (
            <>
              <span className="font-serif text-lg">
                {note.title}
                {note.version && (
                  <span className="ml-2 font-mono text-sm text-muted">
                    v{note.version}
                  </span>
                )}
              </span>
              <span
                aria-hidden
                className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
              >
                ↓
              </span>
            </>
          );
          return (
            <li key={note._id} className="py-5">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 text-fg transition-colors hover:text-accent"
                >
                  {content}
                </a>
              ) : (
                <div className="group flex items-baseline justify-between gap-4 text-fg">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
