import { defineField, defineType, defineArrayMember } from "sanity";
import { CogIcon, LinkIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Academic Title",
      type: "string",
      description: 'e.g. "emer. O. Univ.-Prof."',
    }),
    defineField({
      name: "affiliations",
      title: "Affiliations",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Faculty, university, etc.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Optional short paragraph shown on the home page",
    }),
    defineField({
      name: "navItems",
      title: "Navigation",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          icon: LinkIcon,
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              type: "string",
              description: 'Internal path (e.g. "/publikationen") or full URL',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
