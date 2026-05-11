import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    name,
    title,
    affiliations,
    email,
    intro,
    portrait{
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    navItems[]{
      _key,
      label,
      href
    }
  }
`);

const publicationFields = /* groq */ `
  _id,
  headline,
  details,
  category,
  url,
  "fileUrl": file.asset->url,
  highlighted
`;

export const PUBLICATIONS_QUERY = defineQuery(/* groq */ `
  *[_type == "publication"] | order(sortOrder asc){
    ${publicationFields}
  }
`);

export const PUBLICATIONS_BY_CATEGORY_QUERY = defineQuery(/* groq */ `
  *[_type == "publication" && category == $category]
  | order(sortOrder asc){
    ${publicationFields}
  }
`);

export const HIGHLIGHTED_PUBLICATIONS_QUERY = defineQuery(/* groq */ `
  *[_type == "publication" && highlighted == true]
  | order(sortOrder asc){
    ${publicationFields}
  }
`);

export const STUDENTS_QUERY = defineQuery(/* groq */ `
  *[_type == "student"] | order(year asc){
    _id,
    name,
    kind,
    year,
    url
  }
`);

export const CV_EVENTS_QUERY = defineQuery(/* groq */ `
  *[_type == "cvEvent"] | order(sortOrder asc){
    _id,
    period,
    description
  }
`);

export const LECTURE_NOTES_QUERY = defineQuery(/* groq */ `
  *[_type == "lectureNote"] | order(sortOrder asc){
    _id,
    title,
    version,
    url,
    "fileUrl": file.asset->url
  }
`);

export const MISCELLANEOUS_QUERY = defineQuery(/* groq */ `
  *[_type == "miscellaneous"] | order(sortOrder asc){
    _id,
    title,
    url,
    "fileUrl": file.asset->url,
    description
  }
`);
