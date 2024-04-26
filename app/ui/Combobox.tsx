"use client";

import { useState, Fragment, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useDebounce } from "use-debounce";

export default function Combo() {
  const router = useRouter();
  //to keep search result
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [articles, setArticles] = useState<{ title: string; slug: string }[] | []>([]);
  const [selectedArticle, setSelectedArticle] = useState({ title: null, slug: null });

  function handleChange(article: { title: string | null; slug: string | null }) {
    if (typeof article.slug === null) return;
    router.push(`/articles/${article.slug}`);
  }

  useEffect(() => {
    if (query.length > 1) {
      const controller = new AbortController();
      (async () => {
        const response = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setArticles(data);
      })();
      return () => controller.abort();
    } else {
      setArticles([]);
    }
  }, [debouncedQuery]);

  return (
    //by={id} sorting them by id
    <Combobox value={selectedArticle} onChange={setSelectedArticle} className={"m-5"} as={"div"}>
      <Combobox.Input
        onChange={e => setQuery(e.target.value)}
        displayValue={(article: { title: string; slug: string }) => article.title}
      />
      <Combobox.Button>
        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Combobox.Button>
      <Combobox.Options>
        {articles.map(article => (
          <Combobox.Option key={article.slug} value={article} as={Fragment}>
            {({ active, selected }) => <li>{article.title}</li>}
          </Combobox.Option>
        ))}
      </Combobox.Options>
      <button onClick={() => handleChange(selectedArticle)}>hello</button>
    </Combobox>
  );
}
