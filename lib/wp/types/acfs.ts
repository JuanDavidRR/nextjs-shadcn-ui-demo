export type PageHeroData = {
  label: string;
  title: string;
  title_tag: string;
  description: string;
  image: number;
  link: {
    title: string;
    url: string;
    target: string;
  } | null;
};

export type Solutions = {
  label: string;
  title: string;
  description: string;
  posts: number[];
};
