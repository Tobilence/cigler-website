"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { NavItem } from "@/sanity/lib/types";

type Props = {
  navItems: NavItem[];
};

export function MobileNav({ navItems }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Menü öffnen"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-sm text-fg transition-colors hover:text-accent"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="h-6 w-6"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-50"
        >
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-bg/80 backdrop-blur"
          />
          <div className="absolute inset-x-4 top-4 rounded-sm border border-border bg-bg shadow-lg">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Navigation
              </span>
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-sm text-fg transition-colors hover:text-accent"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="h-6 w-6"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="border-t border-border">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item._key} className="border-b border-border/60 last:border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-5 py-4 font-serif text-lg text-fg transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
