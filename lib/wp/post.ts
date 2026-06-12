import { SEO_FIELDS } from "./seo";

export type WpPost = {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string | null;
  content: string | null;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
  categories: { nodes: Array<{ name: string; slug: string }> };
  seo: {
    title: string | null;
    metaDesc: string | null;
  };
};

export const POST_FIELDS = `
  id title uri date excerpt content
  featuredImage { node { sourceUrl altText } }
  categories { nodes { name slug } }
  ${SEO_FIELDS}
`;

export const POST_LIST_FIELDS = `
  id title uri date excerpt
  featuredImage { node { sourceUrl altText } }
  categories { nodes { name slug } }
  ${SEO_FIELDS}
`;