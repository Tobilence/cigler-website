import Link from "next/link";

import type { NavItem } from "@/sanity/lib/types";

import { MobileNav } from "./mobile-nav";

type Props = {
  name: string | null;
  navItems: NavItem[] | null;
};

export function SiteHeader({ name, navItems }: Props) {
  const items = navItems ?? [];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg tracking-tight text-fg transition-colors hover:text-accent"
        >
          {name ?? "Johann Cigler"}
        </Link>
        <nav className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-x-6 text-sm">
            {items.map((item) => (
              <li key={item._key} className="shrink-0">
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto lg:hidden">
          <MobileNav navItems={items} />
        </div>
      </div>
    </header>
  );
}
