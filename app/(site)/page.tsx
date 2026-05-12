import Image from "next/image";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export default async function HomePage() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
      <section className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Fakultät für Mathematik · Universität Wien
          </p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {settings?.name ?? "Johann Cigler"}
          </h1>
          {settings?.title && (
            <p className="mt-3 font-serif text-xl text-muted sm:text-2xl">
              {settings.title}
            </p>
          )}
          {settings?.affiliations && settings.affiliations.length > 0 && (
            <ul className="mt-6 space-y-1 text-base text-muted">
              {settings.affiliations.map((aff, idx) => (
                <li key={`${aff}-${idx}`}>{aff}</li>
              ))}
            </ul>
          )}
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="mt-2 inline-block text-base text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {settings.email}
            </a>
          )}
          {settings?.intro && (
            <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-fg/90">
              {settings.intro}
            </p>
          )}
        </div>
        <div className="order-first flex justify-center lg:order-last lg:justify-end">
          <Image
            src="/heroimage.jpg"
            alt="Johann Cigler"
            width={264}
            height={397}
            className="h-auto w-full max-w-[260px] rounded-sm border border-border bg-subtle"
            priority
            sizes="(max-width: 1024px) 260px, 260px"
          />
        </div>
      </section>

      <section className="mt-20 border-border pt-10">
        {/* <h2 className="font-serif text-3xl tracking-tight text-fg">Inhalt</h2> */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {settings?.navItems?.map((item) => (
            <li key={item._key}>
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
