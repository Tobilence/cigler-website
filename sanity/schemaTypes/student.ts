import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const student = defineType({
  name: "student",
  title: "Student",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Dissertant", value: "dissertant" },
          { title: "Diplomand", value: "diplomand" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
  ],
  preview: {
    select: { title: "name", kind: "kind", year: "year" },
    prepare: ({ title, kind, year }) => ({
      title,
      subtitle: [kind, year].filter(Boolean).join(" · "),
    }),
  },
});
