import { PageHeader } from "@/components/page-header";
import { PublicationList } from "@/components/publication-list";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PUBLICATIONS_QUERY } from "@/sanity/lib/queries";
import type { Publication } from "@/sanity/lib/types";

export const metadata = {
  title: "Publikationen · Johann Cigler",
};

const VISIBLE_CATEGORIES = ["book", "paper"] as const;

const categoryLabels: Record<(typeof VISIBLE_CATEGORIES)[number], string> = {
  book: "Bücher",
  paper: "Papers",
};

// Pulls the value inside leading brackets, e.g. "[58] Some title" -> "58",
// "[A] Lineare Algebra" -> "A". Falls back to the full headline.
function bracketKey(headline: string): string {
  const match = headline.match(/^\s*\[([^\]]+)\]/);
  return match ? match[1] : headline;
}

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

export default async function PublikationenPage() {
  const publications = await sanityFetch<Publication[]>({
    query: PUBLICATIONS_QUERY,
    tags: ["publication"],
  });

  const grouped: Record<(typeof VISIBLE_CATEGORIES)[number], Publication[]> = {
    book: [],
    paper: [],
  };

  for (const pub of publications) {
    if (pub.category in grouped) {
      grouped[pub.category as (typeof VISIBLE_CATEGORIES)[number]].push(pub);
    }
  }

  // Books: ascending ([A], [B], ...). Papers: descending (newest number first).
  grouped.book.sort((a, b) =>
    collator.compare(bracketKey(a.headline), bracketKey(b.headline)),
  );
  grouped.paper.sort((a, b) =>
    collator.compare(bracketKey(b.headline), bracketKey(a.headline)),
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        title="Publikationen"
        description="Vollständiges Verzeichnis von Büchern und wissenschaftlichen Arbeiten."
      />

      {VISIBLE_CATEGORIES.map((category) => {
        const items = grouped[category];
        if (!items.length) return null;
        return (
          <section key={category} className="mt-16">
            <h2 className="font-serif text-2xl tracking-tight text-fg">
              {categoryLabels[category]}
            </h2>
            <PublicationList publications={items} />
          </section>
        );
      })}
    </div>
  );
}
