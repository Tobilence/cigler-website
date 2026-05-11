import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const cvEvent = defineType({
  name: "cvEvent",
  title: "CV Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "period",
      title: "Date / Period",
      type: "string",
      description: 'e.g. "18. Mai 1937", "1947-1955"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description:
        "Lower numbers appear first. Used to display the CV in chronological order.",
    }),
  ],
  orderings: [
    {
      title: "Chronological",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "period", subtitle: "description" },
  },
});
