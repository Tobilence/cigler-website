import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { resolveLink } from "@/sanity/lib/links";
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
          const link = resolveLink(item);
          const body = (
            <>
              <h3 className="font-serif text-lg text-fg transition-colors group-hover:text-accent">
                {item.title}
                {item.fileUrl && (
                  <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-wider text-accent">
                    PDF
                  </span>
                )}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              )}
            </>
          );
          return (
            <li key={item._id} className="py-5">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {body}
                </a>
              ) : (
                <div className="group">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
