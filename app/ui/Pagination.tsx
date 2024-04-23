import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

function PageButton(props: Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { page: number }) {
  return (
    <Link
      href={`/articles?page=${props.page}`}
      className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
    >
      {props.page}
    </Link>
  );
}

export default function Pagination({
  className,
  pagination,
}: {
  className?: string;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}) {
  // create page array
  const pages = Array.from({ length: pagination.pageCount }, (_, i) => i + 1);

  return (
    <nav className={clsx(className, "flex items-center justify-between border-t border-gray-200 px-4 sm:px-0")}>
      <div className="-mt-px flex w-0 flex-1">
        <Link
          href={`/articles?page=${pagination.page > 0 && pagination.page - 1}`}
          className={clsx(
            pagination.page === 1 && "hidden",
            `inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`
          )}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pages.map(page => (
          <PageButton key={page} page={page} />
        ))}
      </div>
      {/* <div className="hidden md:-mt-px md:flex">
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          1
        </a>
        Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
          aria-current="page"
        >
          2
        </a>
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          3
        </a>
        <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          ...
        </span>
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          8
        </a>
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          9
        </a>
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          10
        </a>
      </div> */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          href={`articles?page=${pagination.page < pagination.pageCount && pagination.page + 1}`}
          className={clsx(
            pagination.page === pagination.pageCount && "hidden",
            `inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`
          )}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
