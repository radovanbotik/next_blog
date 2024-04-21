import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export default function Card<T extends ElementType = "div">({
  as,
  children,
  className,
}: Omit<ComponentPropsWithoutRef<T>, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  let Component = as ?? "div";
  return (
    <Component className={clsx(className, "relative isolate flex flex-col gap-8 lg:flex-row")}>{children}</Component>
  );
}

Card.Image = function CardImage({ src, alt }: ComponentPropsWithoutRef<typeof Image>) {
  return (
    <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
      <Image src={src} alt={alt} fill className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
  );
};

Card.Header = function CardHeader<T extends ElementType = "p">({
  as,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, "as"> & { as?: T }) {
  let Component = as ?? "p";

  return (
    <div className="flex items-center gap-x-4 text-xs">
      <Component className="text-gray-500" {...props}>
        {children}
      </Component>
    </div>
  );
};

Card.Title = function CardTitle<T extends ElementType = "h2">({
  as,
  href,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, "as" | "href"> & {
  as?: T;
  href?: string;
}) {
  let Component = as ?? "h2";

  return (
    <Component className="max-w-xl mt-3 leading-6  group-hover:text-gray-600 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Link = function CardLink({ href, children }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link href={href}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Description = function CardDescription({ children }: { children: ReactNode }) {
  return <div className="max-w-xl mt-2 text-sm  text-zinc-600 dark:text-zinc-400">{children}</div>;
};

Card.Footer = function CardFooter({
  authorImage,
  author,
  authorRole,
  className,
}: Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt"> & {
  authorImage: string;
  author: string;
  authorRole: string;
}) {
  return (
    <div className={clsx(className, "relative flex items-center gap-x-4 mt-24")}>
      <Image
        src={authorImage}
        width={200}
        height={200}
        alt="author image"
        className="h-10 w-10 rounded-full bg-gray-50"
      />
      <div className="text-sm leading-6">
        <p className="font-semibold text-gray-900">{author}</p>
        {authorRole && <p className="text-gray-600">{authorRole}</p>}
      </div>
    </div>
  );
};
