export type NavItem = {
  _key: string;
  label: string;
  href: string;
};

export type SiteSettings = {
  name: string | null;
  title: string | null;
  affiliations: string[] | null;
  email: string | null;
  intro: string | null;
  portrait: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        lqip?: string | null;
        dimensions?: { width: number; height: number } | null;
      } | null;
    } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  navItems: NavItem[] | null;
};

export type PublicationCategory = "book" | "paper" | "preprint";

export type Publication = {
  _id: string;
  headline: string;
  details?: string | null;
  category: PublicationCategory;
  url?: string | null;
  fileUrl?: string | null;
  highlighted?: boolean | null;
};

export type Student = {
  _id: string;
  name: string;
  kind: "dissertant" | "diplomand";
  year?: number | null;
  url?: string | null;
};

export type CvEvent = {
  _id: string;
  period: string;
  description: string;
};

export type LectureNote = {
  _id: string;
  title: string;
  version?: string | null;
  url?: string | null;
  fileUrl?: string | null;
};

export type Miscellaneous = {
  _id: string;
  title: string;
  url?: string | null;
  fileUrl?: string | null;
  description?: string | null;
};
