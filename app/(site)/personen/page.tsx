import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { STUDENTS_QUERY } from "@/sanity/lib/queries";
import type { Student } from "@/sanity/lib/types";

export const metadata = {
  title: "Dissertanten & Diplomanden · Johann Cigler",
};

export default async function PersonenPage() {
  const students = await sanityFetch<Student[]>({
    query: STUDENTS_QUERY,
    tags: ["student"],
  });

  const dissertanten = students.filter((s) => s.kind === "dissertant");
  const diplomanden = students.filter((s) => s.kind === "diplomand");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <PageHeader
        eyebrow="Akademische Begleitung"
        title="Dissertanten & Diplomanden"
        description="Einige Dissertanten und Diplomanden, welche derzeit an Universitäten tätig sind."
      />
      <Section title="Dissertanten" students={dissertanten} />
      <Section title="Diplomanden" students={diplomanden} />
    </div>
  );
}

function Section({ title, students }: { title: string; students: Student[] }) {
  if (!students.length) return null;
  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl tracking-tight text-fg">{title}</h2>
      <ul className="mt-6 divide-y divide-border">
        {students.map((s) => (
          <li
            key={s._id}
            className="flex items-baseline justify-between gap-4 py-4"
          >
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {s.name}
              </a>
            ) : (
              <span className="font-serif text-lg text-fg">{s.name}</span>
            )}
            {s.year && (
              <span className="font-mono text-sm text-muted">{s.year}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
