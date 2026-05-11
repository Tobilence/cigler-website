import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  BookIcon,
  EllipsisHorizontalIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.divider(),
      S.documentTypeListItem("publication")
        .title("Publications")
        .icon(DocumentTextIcon),
      S.documentTypeListItem("lectureNote")
        .title("Lecture Notes")
        .icon(BookIcon),
      S.documentTypeListItem("student").title("Students").icon(UserIcon),
      S.documentTypeListItem("cvEvent").title("CV").icon(CalendarIcon),
      S.documentTypeListItem("miscellaneous")
        .title("Diverses")
        .icon(EllipsisHorizontalIcon),
    ]);
