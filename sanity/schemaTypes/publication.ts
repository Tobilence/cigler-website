import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "headline",
      title: "Upper text",
      type: "string",
      description:
        "First line shown to the reader. Typically authors and title.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      title: "Lower text",
      type: "text",
      rows: 3,
      description:
        "Second line. Typically journal, year, pages, or arXiv identifier.",
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
      name: "highlighted",
      title: "Show in 'Neuere Publikationen'",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "External link (e.g. arXiv, journal page). Ignored when a PDF is uploaded.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      description:
        "Upload a PDF to host the publication directly. Takes precedence over the URL.",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description:
        "Publication date. Used to sort preprints (newest first) and shown next to the entry.",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "details",
      category: "category",
    },
    prepare({ title, subtitle, category }) {
      return {
        title: title ?? "(no headline)",
        subtitle: [category, subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
