// Common fields every page has
export type PageBase = {
  title: string;
  uri: string;
};

export type WpPage = {
  title: string;
  uri: string;
  editorBlocks: WpEditorBlock[];
  seo: WpSeo | null;
};

export type WpEvent = {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string | null;
  featuredImage: { node: { sourceUrl: string; altText: string } } | null;
};

export type WpEditorBlock = {
  name: string;
  attributes?: {
    data?: string;
  };
};

export type WpSeo = {
  title: string | null;
  metaDesc: string | null;
  canonical: string | null;
  opengraphTitle: string | null;
  opengraphDescription: string | null;
  opengraphImage: { sourceUrl: string } | null;
};
