import { PageHeader } from "@/components/page-header";
import { PublicationList } from "@/components/publication-list";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PUBLICATIONS_QUERY } from "@/sanity/lib/queries";
import type { Publication } from "@/sanity/lib/types";

export const metadata = {
  title: "Schriftenverzeichnis · Johann Cigler",
};

const categoryLabels: Record<Publication["category"], string> = {
  book: "Bücher",
  paper: "Papers",
  preprint: "Preprints",
};

export default async function PublikationenPage() {
  const publications = await sanityFetch<Publication[]>({
    query: PUBLICATIONS_QUERY,
    tags: ["publication"],
  });

  const grouped: Record<Publication["category"], Publication[]> = {
    book: [],
    paper: [],
    preprint: [],
  };

  for (const pub of publications) {
    grouped[pub.category]?.push(pub);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Schriftenverzeichnis"
        title="Publikationen"
        description="Vollständiges Verzeichnis von Büchern, wissenschaftlichen Arbeiten und Preprints."
      />

      {(["book", "paper", "preprint"] as const).map((category) => {
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
