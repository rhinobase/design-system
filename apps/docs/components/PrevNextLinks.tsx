"use client";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@rafty/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { navigation } from "../lib/navigation";

function PageLink({
  title,
  href,
  dir = "next",
  ...props
}: Omit<HTMLAttributes<HTMLDListElement>, "title" | "dir"> & {
  title: string;
  href: string;
  dir?: "next" | "previous";
}) {
  const Icon = dir === "next" ? ArrowRightIcon : ArrowLeftIcon;

  return (
    <dl {...props}>
      <dt className="font-display text-secondary-900 text-[0.875rem] font-medium leading-[1.5rem] dark:text-white">
        {dir === "next" ? "Next" : "Previous"}
      </dt>
      <dd className="mt-1">
        <Link
          href={href}
          className={classNames(
            "text-secondary-500 hover:text-secondary-600 dark:text-secondary-400 dark:hover:text-secondary-300 flex items-center gap-1.5 text-[1rem] font-semibold leading-[2rem]",
            dir === "previous" && "flex-row-reverse",
          )}
        >
          {title}
          <Icon height={15} width={15} className="stroke-[3]" />
        </Link>
      </dd>
    </dl>
  );
}

export function PrevNextLinks() {
  const pathname = usePathname();
  const allLinks = navigation.flatMap((section) => section.links);
  const linkIndex = allLinks.findIndex((link) => link.href === pathname);
  const previousPage = linkIndex > -1 ? allLinks[linkIndex - 1] : null;
  const nextPage = linkIndex > -1 ? allLinks[linkIndex + 1] : null;

  if (!nextPage && !previousPage) {
    return null;
  }

  return (
    <div className="border-secondary-200 dark:border-secondary-800 mt-12 flex flex-col border-t">
      <EditOnGithub pathname={pathname} />
      <div className="mt-6 flex">
        {previousPage && <PageLink dir="previous" {...previousPage} />}
        {nextPage && <PageLink className="ml-auto text-right" {...nextPage} />}
      </div>
    </div>
  );
}

function EditOnGithub({ pathname }: { pathname: string }) {
  // Link to .md file
  const href = [
    "https://github.com/rhinobase/raftyui/blob/main/apps/docs/app",
    pathname === "/" ? "" : pathname,
    "/page.md",
  ].join("");

  return (
    <Link
      href={href}
      className="text-secondary-500 dark:text-secondary-400 flex w-max items-center gap-2 py-4 transition-all ease-in-out hover:text-blue-500 md:py-6 dark:hover:text-blue-300"
      target="_blank"
      referrerPolicy="no-referrer"
    >
      <PencilIcon height={15} width={15} className="stroke-2" />
      <p className="text-[0.875rem] leading-[1.5rem]">
        Edit this page on GitHub
      </p>
    </Link>
  );
}
