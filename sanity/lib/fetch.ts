import type { QueryParams } from "next-sanity";

import { client } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 600,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}
