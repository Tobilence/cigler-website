import Image from "next/image";
import Link from "next/link";

const NAME = "Johann Cigler";
const TITLE = "emer. O. Univ.-Prof.";
const AFFILIATIONS = ["Fakultät für Mathematik", "Universität Wien"];
const EMAIL = "johann.cigler@univie.ac.at";
const INTRO =
  "Meine Forschung umfasst Kombinatorik, q-Identitäten, Fibonacci- und Catalan-Zahlen sowie Hankel-Determinanten.";

const NAV_ITEMS = [
  { key: "n1", href: "/publikationen", label: "Publikationen" },
  { key: "n2", href: "/preprints", label: "Preprints" },
  { key: "n3", href: "/skripten", label: "Skripten" },
  { key: "n4", href: "/lebenslauf", label: "Lebenslauf" },
  { key: "n5", href: "/diverses", label: "Diverses" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
      <section className="grid gap-12 md:grid-cols-[1.6fr_1fr] md:gap-10 lg:gap-16">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Fakultät für Mathematik · Universität Wien
          </p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {NAME}
          </h1>
          <p className="mt-3 font-serif text-xl text-muted sm:text-2xl">
            {TITLE}
          </p>
          <ul className="mt-6 space-y-1 text-base text-muted">
            {AFFILIATIONS.map((aff) => (
              <li key={aff}>{aff}</li>
            ))}
          </ul>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-2 inline-block text-base text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {EMAIL}
          </a>
          <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-fg/90">
            {INTRO}
          </p>
        </div>
        <div className="order-first flex justify-center md:order-last md:justify-end">
          <Image
            src="/heroimage.jpg"
            alt="Johann Cigler"
            width={264}
            height={397}
            className="h-auto w-full max-w-[260px] rounded-sm border border-border bg-subtle"
            priority
            sizes="260px"
          />
        </div>
      </section>

      <section className="mt-20 border-border pt-10">
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="flex h-full items-center justify-start rounded-sm border border-border bg-subtle/40 px-6 py-6 text-center font-serif text-xl text-fg transition-colors hover:border-accent hover:bg-subtle hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
