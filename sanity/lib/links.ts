export function resolveLink(item: {
  fileUrl?: string | null;
  url?: string | null;
}): string | null {
  return item.fileUrl || item.url || null;
}
