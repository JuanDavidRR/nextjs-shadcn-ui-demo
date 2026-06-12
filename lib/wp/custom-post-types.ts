import { wpFetch } from "./client";

// ─── ONE type for ALL custom post types ───

export type WpCpt = {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string | null;
  content?: string | null;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  tags?: { nodes: Array<{ name: string; slug: string }> };
  categories?: { nodes: Array<{ name: string; slug: string }> };
  solutionTerms?: { nodes: Array<{ name: string; slug: string }> };
};

// ─── Shared field selections ───

export const CPT_LIST_FIELDS = `
  id title uri date excerpt
  featuredImage { node { sourceUrl altText } }
  tags { nodes { name slug } }
  categories { nodes { name slug } }
`;

export const CPT_FIELDS = `
  id title uri date excerpt content
  featuredImage { node { sourceUrl altText } }
  tags { nodes { name slug } }
  categories { nodes { name slug } }
`;

// ─── Generic fetchers ───

type ListArgs = {
  cptPlural: string;
  fields: string;
  first?: number;
};

type SingleArgs = {
  cptSingular: string;
  uri: string;
  fields: string;
};

export async function fetchCptList<T>({
  cptPlural,
  fields,
  first = 20,
}: ListArgs): Promise<T[]> {
  const query = `
    query GetList($first: Int!) {
      ${cptPlural}(first: $first) {
        nodes { ${fields} }
      }
    }
  `;
  const data = await wpFetch<{ [key: string]: { nodes: T[] } }>({
    query,
    variables: { first },
    revalidate: 3600,
    tags: [cptPlural],
  });
  return data[cptPlural].nodes;
}

export async function fetchCptByUri<T>({
  cptSingular,
  uri,
  fields,
}: SingleArgs): Promise<T | null> {
  const query = `
    query GetOne($uri: ID!) {
      ${cptSingular}(id: $uri, idType: URI) {
        ${fields}
      }
    }
  `;
  const data = await wpFetch<{ [key: string]: T | null }>({
    query,
    variables: { uri },
    revalidate: 3600,
    tags: [cptSingular, `${cptSingular}:${uri}`],
  });
  return data[cptSingular];
}

type ByIdArgs = {
  cptSingular: string;
  id: string | number;
  fields: string;
};

export async function fetchCptById<T>({
  cptSingular,
  id,
  fields,
}: ByIdArgs): Promise<T | null> {
  const query = `
    query GetOne($id: ID!) {
      ${cptSingular}(id: $id, idType: DATABASE_ID) {
        ${fields}
      }
    }
  `;
  const data = await wpFetch<{ [key: string]: T | null }>({
    query,
    variables: { id: String(id) },
    revalidate: 3600,
    tags: [cptSingular, `${cptSingular}:${id}`],
  });
  return data[cptSingular];
}

export type WpQuote = {
  id: string;
  title: string;
  excerpt: string | null;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  quoteOptions: {
    jobTitle: string | null;
    companyLogo: { node: { sourceUrl: string; altText: string } } | null;
  } | null;
};

export const QUOTE_FIELDS = `
  id title excerpt
  featuredImage { node { sourceUrl altText } }
  quoteOptions {
    jobTitle
    companyLogo { node { sourceUrl altText } }
  }
`;
