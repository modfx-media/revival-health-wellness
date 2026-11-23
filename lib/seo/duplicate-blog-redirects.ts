/**
 * Payload published shorter slugs that repeat an older code blog.
 * Keep the older URL (it has search history) and redirect the newer slug.
 */
export const DUPLICATE_BLOG_SLUGS: { from: string; to: string }[] = [
  {
    from: "cost-of-botox-what-influences-total-price",
    to: "cost-of-botox-in-las-vegas-and-what-influences-your-total-price",
  },
  {
    from: "botox-in-las-vegas-first-time-forehead-lines",
    to: "considering-botox-in-las-vegas-for-first-time-forehead-lines",
  },
  {
    from: "questioning-medical-spa-summerlin-hype",
    to: "questioning-medical-spa-summerlin-hype-how-to-vet-real-expertise",
  },
  {
    from: "medical-spa-subtle-facial-balancing",
    to: "leveraging-a-medical-spa-in-henderson-nv-for-subtle-facial-balancing",
  },
  {
    from: "botox-relieve-migraine-and-tmj-pain",
    to: "migraine-and-tmj-relief-options-with-botox",
  },
];

export const duplicateBlogRedirects = DUPLICATE_BLOG_SLUGS.map(({ from, to }) => ({
  source: `/blogs/${from}`,
  destination: `/blogs/${to}/`,
  permanent: true as const,
}));

export const redirectedBlogPaths = new Set(
  DUPLICATE_BLOG_SLUGS.map(({ from }) => `/blogs/${from}`),
);
