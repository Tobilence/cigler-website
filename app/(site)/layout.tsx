import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        name={settings?.name ?? null}
        navItems={settings?.navItems ?? null}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter
        name={settings?.name ?? null}
        email={settings?.email ?? null}
      />
    </div>
  );
}
