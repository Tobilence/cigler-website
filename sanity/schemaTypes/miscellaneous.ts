import { defineField, defineType } from "sanity";
import { EllipsisHorizontalIcon } from "@sanity/icons";

export const miscellaneous = defineType({
  name: "miscellaneous",
  title: "Diverses Item",
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
      description: "Optional external link.",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      description:
        "Optional PDF download. Can be used alongside the URL.",
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
