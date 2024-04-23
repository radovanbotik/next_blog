import { getReviews } from "../lib/data";
import { Article as ArticleProps } from "../lib/types";
import Card from "../ui/CardHighlight";
import SimpleLayout from "../ui/SimpleLayout";

function Article(article: ArticleProps) {
  return (
    <Card>
      <Card.Image src={article.image} alt="image"></Card.Image>
      <div className="flex flex-col h-full w-full">
        <Card.Header>{article.date}</Card.Header>
        <Card.Title href={`articles/${article.slug}`}>{article.title}</Card.Title>
        <Card.Description>{article.subtitle}</Card.Description>
        {/* <Card.Footer authorImage={article.image} author="Rado" authorRole="Technical Care Rep"></Card.Footer> */}
      </div>
    </Card>
  );
}

// export const forceDynamic = "force-dynamic";
export const revalidate = 60;

export default async function page() {
  const articles = await getReviews();

  return (
    <SimpleLayout
      title="My articles"
      intro="
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae incidunt, repellendus sapiente ea velit pariatur dolores ullam reiciendis. Blanditiis, nostrum.
  "
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article: ArticleProps) => (
            <Article key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
