import Image from "next/image";
import { getReview } from "@/app/lib/data";
import { ReactNode } from "react";

type Props = {
  params: { slug: string };
  children?: ReactNode;
};

export default async function Example(props: Props) {
  const data = await getReview(props.params.slug);

  return (
    <div>
      <h1 className="text-4xl">{data.title}</h1>
      <p>{data.date}</p>
      <Image src={`/${data.image}`} width={1007} height={542} alt="article image" />
      <div dangerouslySetInnerHTML={{ __html: data.html }} className="prose mx-auto"></div>;
    </div>
  );
}
