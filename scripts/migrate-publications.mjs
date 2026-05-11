import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const token = env.match(/SANITY_API_READ_TOKEN=(.+)/)?.[1]?.trim();
if (!token) throw new Error("SANITY_API_READ_TOKEN not found in .env.local");

const client = createClient({
  projectId: "3n3li0ew",
  dataset: "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
  perspective: "raw",
});

const pubs = await client.fetch(`*[_type == "publication"]{
  _id,
  title,
  label,
  authors,
  citation,
  identifier,
  notes
}`);

console.log(`Migrating ${pubs.length} publications...`);

let tx = client.transaction();
let count = 0;

for (const doc of pubs) {
  const headlineParts = [];
  if (doc.label) headlineParts.push(doc.label);
  if (doc.authors) headlineParts.push(`(${doc.authors})`);
  if (doc.title) headlineParts.push(doc.title);
  const headline = headlineParts.join(" ").trim();

  const detailsParts = [];
  if (doc.citation) detailsParts.push(doc.citation);
  if (doc.identifier) detailsParts.push(doc.identifier);
  if (doc.notes) detailsParts.push(doc.notes);
  const details = detailsParts.join("\n\n");

  tx = tx.patch(doc._id, (p) =>
    p
      .set({ headline, details })
      .unset([
        "title",
        "label",
        "authors",
        "citation",
        "year",
        "identifier",
        "notes",
      ]),
  );
  count++;

  if (count % 50 === 0) {
    await tx.commit();
    console.log(`Migrated ${count}/${pubs.length}`);
    tx = client.transaction();
  }
}

if (count % 50 !== 0) {
  await tx.commit();
}

console.log(`Done. Migrated ${count} publications.`);
