import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CV_EVENTS_QUERY } from "@/sanity/lib/queries";
import type { CvEvent } from "@/sanity/lib/types";

export const metadata = {
  title: "Lebenslauf · Johann Cigler",
};

export default async function LebenslaufPage() {
  const events = await sanityFetch<CvEvent[]>({
    query: CV_EVENTS_QUERY,
    tags: ["cvEvent"],
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Curriculum Vitae"
        title="Lebenslauf"
        description="Eckdaten aus dem akademischen und persönlichen Werdegang."
      />
      <ol className="mt-12 space-y-8 border-l border-border pl-8 sm:pl-10">
        {events.map((event) => (
          <li key={event._id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[34px] top-2 size-2.5 rounded-full border border-accent bg-bg sm:-left-[42px]"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {event.period}
            </p>
            <p className="mt-1 font-serif text-lg text-fg">
              {event.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
