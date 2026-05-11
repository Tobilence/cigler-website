import { PageHeader } from "@/components/page-header";
import { PublicationList } from "@/components/publication-list";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PUBLICATIONS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import type { Publication } from "@/sanity/lib/types";

export const metadata = {
  title: "Preprints · Johann Cigler",
};

export default async function PreprintsPage() {
  const publications = await sanityFetch<Publication[]>({
    query: PUBLICATIONS_BY_CATEGORY_QUERY,
    params: { category: "preprint" },
    tags: ["publication"],
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Vorabdrucke"
        title="Preprints"
      />
      <PublicationList publications={publications} />
    </div>
  );
}
