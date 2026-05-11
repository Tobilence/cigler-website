import Link from "next/link";

import type { NavItem } from "@/sanity/lib/types";

type Props = {
  name: string | null;
  navItems: NavItem[] | null;
};

export function SiteHeader({ name, navItems }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-fg transition-colors hover:text-accent"
        >
          {name ?? "Johann Cigler"}
        </Link>
        <nav className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {navItems?.map((item) => (
              <li key={item._key}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="md:hidden">
        <nav className="mx-auto flex max-w-5xl gap-x-4 gap-y-2 overflow-x-auto px-6 pb-3 text-sm">
          {navItems?.map((item) => (
            <Link
              key={item._key}
              href={item.href}
              className="whitespace-nowrap text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
