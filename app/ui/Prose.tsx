import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export default function Prose({ className, html, ...props }: ComponentPropsWithoutRef<"div"> & { html: string }) {
  return <div className={clsx(className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
