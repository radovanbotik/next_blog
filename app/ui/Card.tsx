import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export default function Card<T extends ElementType = "div">({
  as,
  className,
  children,
}: Omit<ComponentPropsWithoutRef<T>, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  let Component = as ?? "div";
  return <Component className={clsx(className, "group relative flex flex-col items-start")}>{children}</Component>;
}

//Title,Header,Description,CTA are all nested inside Link
//typeof Link meaning it will accept same props as regular link
//first div creates background color hover transition opacity-0 scale-95
Card.Link = function CardLink({ children, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

//sets component to passed component type or h2
//if href is passed renders Card.Link otherwise renders wrapped content
Card.Title = function CardTitle<T extends ElementType = "h2">({
  as,
  href,
  children,
}: Omit<ComponentPropsWithoutRef<T>, "as" | "href"> & {
  as?: T;
  href?: string;
}) {
  let Component = as ?? "h2";
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

//if decorate is true it creates small gray line at the start of the line
Card.Header = function CardHeader<T extends ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, "as" | "decorate"> & {
  as?: T;
  decorate?: boolean;
}) {
  let Component = as ?? "p";
  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};

Card.Description = function CardDescription({ children }: { children: ReactNode }) {
  return <div className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{children}</div>;
};

Card.CTA = function CardCTA({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};
Card.Image = function CardImage({ src, alt }: ComponentPropsWithoutRef<typeof Image>) {
  return (
    <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
      <Image src={src} alt={alt} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
  );
};
