import Link from "next/link";
import { ContainerInner, ContainerOuter } from "./Container";
import { ComponentPropsWithoutRef } from "react";

function NavLink({ href, children, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className="transition hover:text-teal-500 dark:hover:text-teal-400">
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-8 pt-5 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Radovan Botik
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
