"use client";

import { useRouter } from "next/navigation";
import { Container } from "./Container";
import { ReactNode, useContext, useState } from "react";
import { AppContext } from "../Providers";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Article } from "../lib/types";
import Image from "next/image";
import ShareArticle from "./ShareArticle";

export default function ArticleLayout({ article, children }: { article: Article; children?: ReactNode }) {
  let router = useRouter();
  let { previousPathname } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const currentPage = window.location.href;

  return (
    <Container className="mt-16 lg:mt-32">
      {previousPathname && (
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          </div>
        </div>
      )}
      <article className="space-y-8">
        <header className="flex flex-col">
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {article.title}
          </h1>
          <time
            dateTime={article.date}
            className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            <span className="ml-3">{article.date}</span>
          </time>
        </header>
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12  lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 mx-auto">
            <Image
              src={article.image}
              width={1007}
              height={542}
              alt="article image"
              className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
            />
          </div>
          <ShareArticle currentPage={currentPage} />
          <div dangerouslySetInnerHTML={{ __html: article.html }}></div>
        </div>
      </article>
    </Container>
  );
}
