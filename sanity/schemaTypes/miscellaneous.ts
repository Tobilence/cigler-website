import { defineField, defineType } from "sanity";
import { EllipsisHorizontalIcon } from "@sanity/icons";

export const miscellaneous = defineType({
  name: "miscellaneous",
  title: "Miscellaneous Item",
  type: "document",
  icon: EllipsisHorizontalIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
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
      description: "Upload a PDF. Takes precedence over the URL.",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
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
    select: { title: "title", subtitle: "url" },
  },
});
