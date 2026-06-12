import { unstable_cache } from "next/cache";
import { wpFetch } from "./client";
import { WpPage } from "./types";
import { SEO_FIELDS } from "./seo";

const LOCALE_PREFIXES = ["es", "zh-hans"];

function stripLocalePrefix(uri: string): string {
  const segments = uri.split("/").filter(Boolean);
  if (segments.length > 1 && LOCALE_PREFIXES.includes(segments[0])) {
    segments.shift();
    return `/${segments.join("/")}`;
  }
  return uri;
}

const PAGE_QUERY = `
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      uri
      editorBlocks {
        name
      ... on AcfPageHero {
        attributes { data }
      }
      ... on AcfSolutionsSlider {
        attributes { data }
      }
      ... on AcfQuoteSlider {
        attributes { data }
      }
      ... on AcfInfoIconText {
        attributes { data }
    }
  }
      ${SEO_FIELDS}
    }
  }
`;

async function fetchPage(uri: string): Promise<WpPage | null> {
  const wpUri = stripLocalePrefix(uri);

  const data = await wpFetch<{ page: WpPage | null }>({
    query: PAGE_QUERY,
    variables: { uri: wpUri },
    revalidate: 3600,
    tags: ["page", `page:${uri}`],
  });
  return data.page;
}

export const getPage = unstable_cache(
  async (uri: string) => fetchPage(uri),
  ["page"],
  { revalidate: 3600, tags: ["page"] },
);
