import { PageHeader } from "@/components/page-header";
import { PublicationList } from "@/components/publication-list";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HIGHLIGHTED_PUBLICATIONS_QUERY } from "@/sanity/lib/queries";
import type { Publication } from "@/sanity/lib/types";

export const metadata = {
  title: "Neuere Publikationen · Johann Cigler",
};

export default async function NeuerePublikationenPage() {
  const publications = await sanityFetch<Publication[]>({
    query: HIGHLIGHTED_PUBLICATIONS_QUERY,
    tags: ["publication"],
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Aktuelle Arbeiten"
        title="Neuere Publikationen"
        description="Eine Auswahl jüngerer wissenschaftlicher Arbeiten."
      />
      <PublicationList publications={publications} />
    </div>
  );
}
