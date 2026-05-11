import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { publication } from "./publication";
import { student } from "./student";
import { cvEvent } from "./cvEvent";
import { lectureNote } from "./lectureNote";
import { miscellaneous } from "./miscellaneous";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  publication,
  student,
  cvEvent,
  lectureNote,
  miscellaneous,
];
