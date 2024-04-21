import { getReview, getSlugs } from "@/app/lib/data";
import ArticleLayout from "@/app/ui/ArticleLayout";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug;
  return {
    title: slug,
  };
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug: string) => ({ slug: slug }));
}

export default async function Article(props: Props) {
  const data = await getReview(props.params.slug);

  return <ArticleLayout article={data} />;
}
