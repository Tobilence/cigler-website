import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { MISCELLANEOUS_QUERY } from "@/sanity/lib/queries";
import type { Miscellaneous } from "@/sanity/lib/types";

export const metadata = {
  title: "Diverses · Johann Cigler",
};

export default async function DiversesPage() {
  const items = await sanityFetch<Miscellaneous[]>({
    query: MISCELLANEOUS_QUERY,
    tags: ["miscellaneous"],
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Mathematische Randbemerkungen"
        title="Diverses"
        description="Eine Sammlung mathematischer Notizen, Bemerkungen und ergänzender Beiträge."
      />
      <ul className="mt-10 divide-y divide-border">
        {items.map((item) => {
          const primaryHref = item.url ?? item.fileUrl ?? null;
          const isPdfPrimary = !item.url && !!item.fileUrl;

          const titleContent = (
            <>
              {item.title}
              {item.fileUrl && (
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
            <li key={item._id} className="py-5">
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
              {item.description && (
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              )}
              {item.url && item.fileUrl && (
                <p className="mt-1 text-xs">
                  <a
                    href={item.fileUrl}
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
