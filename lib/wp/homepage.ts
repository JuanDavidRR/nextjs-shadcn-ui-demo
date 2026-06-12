import { unstable_cache } from "next/cache";
import { wpFetch } from "./client";
import { HOMEPAGE_QUERY } from "./queries";

// What the query actually returns
type Language = {
  language_code: string;
  native_name: string;
};

type Translation = {
  language: Language;
};

export type Homepage = {
  title: string;
  language: Language;
  translations: Translation[];
  moduleGrid3ColCenterTop: {
    g3ctHeadline: string | null;
  } | null;
};

async function fetchHomepage(uri: string): Promise<Homepage | null> {
  const data = await wpFetch<{ page: Homepage | null }>({
    query: HOMEPAGE_QUERY,
    variables: { uri },
    revalidate: 3600,
    tags: ["homepage", `homepage:${uri}`],
  });
  return data.page;
}

export const getHomepage = unstable_cache(
  async (uri: string) => fetchHomepage(uri),
  ["homepage"],
  { revalidate: 3600, tags: ["homepage"] },
);
