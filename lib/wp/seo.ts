export const SEO_FIELDS = `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl }
  }
`;

export type WpSeo = {
  title: string | null;
  metaDesc: string | null;
  canonical: string | null;
  opengraphTitle: string | null;
  opengraphDescription: string | null;
  opengraphImage: { sourceUrl: string } | null;
};
