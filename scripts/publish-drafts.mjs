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

const drafts = await client.fetch(
  `*[_id in path('drafts.**')]{_id, _rev}`,
);

console.log(`Found ${drafts.length} drafts to publish.`);

let tx = client.transaction();
let count = 0;

for (const draft of drafts) {
  const publishedId = draft._id.replace(/^drafts\./, "");
  // Create or replace the published doc
  tx = tx
    .createOrReplace({
      ...(await client.getDocument(draft._id)),
      _id: publishedId,
    })
    .delete(draft._id);
  count++;
  if (count % 50 === 0) {
    await tx.commit();
    console.log(`Published ${count}/${drafts.length}`);
    tx = client.transaction();
  }
}

if (count % 50 !== 0) {
  await tx.commit();
}

console.log(`Done. Published ${count} documents.`);
