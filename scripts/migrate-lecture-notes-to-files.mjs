import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

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

const notes = await client.fetch(`*[_type == "lectureNote" && defined(url) && !defined(file)]{
  _id,
  title,
  version,
  url
}`);

console.log(`Found ${notes.length} lecture note(s) with external URLs and no uploaded file.`);

for (const note of notes) {
  const filename = basename(new URL(note.url).pathname) || `${note._id}.pdf`;
  process.stdout.write(`• ${note.title}${note.version ? ` v${note.version}` : ""} → ${filename} ... `);

  const res = await fetch(note.url);
  if (!res.ok) {
    console.log(`SKIP (HTTP ${res.status})`);
    continue;
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  const asset = await client.assets.upload("file", buffer, {
    filename,
    contentType: "application/pdf",
  });

  await client
    .patch(note._id)
    .set({ file: { _type: "file", asset: { _type: "reference", _ref: asset._id } } })
    .unset(["url"])
    .commit();

  console.log("ok");
}

console.log("Done.");
