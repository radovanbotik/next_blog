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
      data: [
        {
          attributes: {
            url: string;
          };
        }
      ];
    };
  };
};

const CMS_URL = "http://localhost:1337";

function toReview(object: ArticleResponse) {
  const { attributes } = object;
  const html = marked.parse(attributes.body);
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    html: html as string,
    date: new Date(attributes.publishedAt).toLocaleDateString(),
    image: `${CMS_URL}${attributes.image.data[0].attributes.url}`,
  };
}

export async function getReview(slug: string) {
  const url = `http://localhost:1337/api/articles?${qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: { image: { fields: ["url"] } },
      pagination: { pageSize: 1, withCount: false },
    },
    { encodeValuesOnly: true }
  )}`;
  const response = await fetch(url);
  const { data } = await response.json();
  return toReview(data[0]);
}

export async function getReviews() {
  const url = `http://localhost:1337/api/articles?${qs.stringify(
    {
      fields: ["slug", "title", "subtitle", "publishedAt", "body"],
      populate: { image: { fields: ["url"] } },
      pagination: { pageSize: 6 },
      sort: ["publishedAt:desc"],
    },
    { encodeValuesOnly: true }
  )}`;
  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(toReview);
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
