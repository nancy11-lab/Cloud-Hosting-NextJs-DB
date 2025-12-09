export const ARTICLE_PER_PAGE = 6;

const PRODCTION_DOMAIN = "https://cloud-hosting-next-js-db.vercel.app";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production" ? PRODCTION_DOMAIN : DEVELOPMENT_DOMAIN;
