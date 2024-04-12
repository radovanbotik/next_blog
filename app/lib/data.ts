import { readFile, readdir } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
const fs = require("fs");

export async function getReview(slug: string) {
  const article = await readFile(`app/content/articles/${slug}.md`, "utf-8");
  const { data, content } = matter(article);
  const html = marked.parse(content);
  const date = new Date(data.date).toLocaleDateString();
  return { title: data.title, date: date, image: data.image, html: html, slug: slug };
}

export async function getReviews() {
  const readFiles = await readdir("app/content/articles");
  const slugs = readFiles.map(file => file.split(".")[0]);
  const articlesPromises = [];
  for (const slug of slugs) {
    const article = await getReview(slug);
    articlesPromises.push(article);
  }
  const articles = await Promise.all(articlesPromises);
  return articles;
}

export async function getSlugs() {
  const readFiles = await readdir("app/content/articles");
  const slugs = readFiles.map(file => file.split(".")[0]);
  return slugs;
}
