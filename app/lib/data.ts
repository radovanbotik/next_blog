import "server-only";
import qs from "qs";
import { marked } from "marked";

type ArticleResponse = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    subtitle: string;
    publishedAt: Date;
    body: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export const CACHE_TAG_ARTICLES = "articles";
const CMS_URL = "http://localhost:1337";

async function fetchReviews(params: {
  filters?: {};
  fields?: string[];
  populate?: {};
  pagination?: { pageSize?: number; page?: number; withCount?: boolean };
  sort?: string[];
}) {
  const url = `${CMS_URL}/api/articles?${qs.stringify(params, { encodeValuesOnly: true })}`;
  //revalidatation fires when strapi webhook post same tag to next.js server
  const response = await fetch(url, { next: { tags: [CACHE_TAG_ARTICLES] } });
  console.log(url);
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(object: ArticleResponse) {
  const { attributes } = object;
  const html = marked.parse(attributes.body);
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    html: html as string,
    date: new Date(attributes.publishedAt).toLocaleDateString(),
    image: `${CMS_URL}${attributes.image.data.attributes.url}`,
  };
}

export async function getReview(slug: string) {
  const { data } = await fetchReviews({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }
  return toReview(data[0]);
}

export async function getReviews({ pageSize, pageCount }: { pageSize?: number; pageCount?: number }) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: pageSize, page: pageCount },
    sort: ["publishedAt:asc"],
  });
  // return data.map(toReview);
  const articles = data.map(toReview);
  return { articles: articles, pagination: meta.pagination };
}

export async function getSlugs() {
  const url = `http://localhost:1337/api/articles?${qs.stringify(
    {
      fields: ["slug"],
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 100 },
    },
    {
      encodeValuesOnly: true,
    }
  )}`;
  const response = await fetch(url);
  const { data } = await response.json();
  const slugs = data.map((article: ArticleResponse) => {
    return article.attributes.slug;
  });
  return slugs;
}

export async function searchArticles({ query }: { query: string }) {
  console.log(query);
  const url = `${CMS_URL}/api/articles?${qs.stringify(
    {
      filters: { title: { $containsi: query } },
      fields: ["slug", "title"],
      sort: ["title"],
      pagination: { pageSize: 5 },
    },
    { encodeValuesOnly: true }
  )}`;
  const response = await fetch(url);
  const { data } = await response.json();
  const articles = data.map(({ attributes }: { attributes: { title: string; slug: string } }) => ({ ...attributes }));
  return articles;
}
