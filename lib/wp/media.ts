import { unstable_cache } from "next/cache";
import { wpFetch } from "./client";

export type WpMedia = {
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
};

const MEDIA_QUERY = `
  query GetMedia($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
`;

async function fetchMedia(id: number): Promise<WpMedia | null> {
  const data = await wpFetch<{ mediaItem: WpMedia | null }>({
    query: MEDIA_QUERY,
    variables: { id: String(id) },
    revalidate: 3600,
    tags: ["media", `media:${id}`],
  });
  return data.mediaItem;
}

export const getMedia = unstable_cache(
  async (id: number) => fetchMedia(id),
  ["media"],
  { revalidate: 3600, tags: ["media"] },
);
