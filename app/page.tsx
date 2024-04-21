import LinkedIn from "@/public/svgs/LinkedIn";
import { Container } from "./ui/Container";
import SocialLink from "./ui/SocialLink";
import Messenger from "@/public/svgs/Messenger";
import Photos from "./ui/Photos";
import { getReviews } from "./lib/data";
import Article from "./ui/Article";
import { Article as ArticleType } from "./lib/types";
import Newsletter from "./ui/Newsletter";
import Resume from "./ui/Resume";

// Container centers the content in the middle of the screen
// Second container holds a grid with 2 columns on XL screen
// Photos is not using any sort of container and therefore spans entire Screen-Width

export default async function Example() {
  const articles = await getReviews();

  return (
    <>
      <Container className="mt-9">
        <div className="mx-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software designer, founder, and amateur astronaut.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of
            Planetaria, where we develop technologies that empower regular people to explore space on their own terms.
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <SocialLink href={"/"} icon={LinkedIn} aria-label="Connect on LinkedIn" />
          <SocialLink href={"/"} icon={Messenger} aria-label="Leave message on Messenger." />
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article: ArticleType) => (
              <Article key={article.slug} {...article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
