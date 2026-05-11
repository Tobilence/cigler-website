import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const lectureNote = defineType({
  name: "lectureNote",
  title: "Lecture Note",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: 'e.g. "1.3", "7.5"',
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "External link. Ignored when a PDF is uploaded.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      description: "Upload a PDF of the lecture note. Takes precedence over the URL.",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "version" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `v${subtitle}` : undefined,
    }),
  },
});
