import { getReviews } from "../lib/data";
import { Article as ArticleProps } from "../lib/types";
import Card from "../ui/CardHighlight";
import Pagination from "../ui/Pagination";
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
const PAGE_SIZE = 6;

//validates and return correct page count, searchparams.page does not exists it returns 1
function validatePageParam(pageParamValue: string | undefined) {
  if (pageParamValue) {
    const pageCount = Number(pageParamValue);
    if (isFinite(pageCount) && pageCount > 0) {
      return pageCount;
    }
  }
  return 1;
}

export default async function page(props: { params: {}; searchParams: { page?: string } }) {
  //if search params exists set pageCount to searchParams.page, otherwise set pageCount to 1
  // const pageCount = props.searchParams ? Number(props.searchParams.page) : Number(1);
  const currentPage = validatePageParam(props.searchParams.page);
  const { articles, pagination } = await getReviews({ pageSize: PAGE_SIZE, pageCount: currentPage });
  console.log(pagination);

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
      <Pagination className="mt-16" pagination={pagination} />
    </SimpleLayout>
  );
}
