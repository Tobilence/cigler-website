import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Book", value: "book" },
          { title: "Paper", value: "paper" },
          { title: "Preprint", value: "preprint" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Original numbering, e.g. "[A]", "[1]", "[56]"',
    }),
    defineField({
      name: "authors",
      title: "Co-authors",
      type: "string",
      description:
        'Co-authors aside from Johann Cigler, e.g. "gem. m. Christian Krattenthaler".',
    }),
    defineField({
      name: "citation",
      title: "Citation",
      type: "text",
      rows: 2,
      description:
        "Journal, publisher, volume, year, pages — full bibliographic info as a single string.",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Used for sorting and grouping.",
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: "identifier",
      title: "Identifier",
      type: "string",
      description: 'e.g. "arXiv:2003.01676" or "arXiv math CO/0507225"',
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "External link (e.g. arXiv, journal page). Ignored when a PDF is uploaded.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      description: "Upload a PDF to host the publication directly. Takes precedence over the URL.",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "highlighted",
      title: "Show in 'Neuere Publikationen'",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Optional. Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Label (natural)",
      name: "labelAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      label: "label",
      category: "category",
      year: "year",
    },
    prepare({ title, label, category, year }) {
      const prefix = label ? `${label} ` : "";
      return {
        title: `${prefix}${title ?? ""}`,
        subtitle: [category, year].filter(Boolean).join(" · "),
      };
    },
  },
});
