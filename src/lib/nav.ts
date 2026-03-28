// src/lib/nav.ts
import { NavQuery } from "~/__generated__/types";
import type { NavigationSection } from "~/components/shadcn-space/blocks/hero-01/header";

export type FooterData = NonNullable<NavQuery['nav']['footer']>;

export function toNavItems(
  items: ({ title?: string | null; href?: string | null } | null)[] | null | undefined
): NavigationSection[] {
  return (items ?? [])
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map(({ title, href }) => ({ title: title ?? "", href: href ?? "" }));
}

export function toFooterProps(footerData: FooterData | null | undefined) {
  return {
    copyright: footerData?.copyright ?? "",
    menuItems: (footerData?.menuItems ?? [])
      .filter((s): s is NonNullable<typeof s> => s !== null)
      .map((section) => ({
        title: section.title ?? "",
        links: (section.links ?? [])
          .filter((l): l is NonNullable<typeof l> => l !== null)
          .map((link) => ({ text: link.text ?? "", url: link.url ?? "" })),
      })),
    bottomLinks: (footerData?.bottomLinks ?? [])
      .filter((l): l is NonNullable<typeof l> => l !== null)
      .map((link) => ({ text: link.text ?? "", url: link.url ?? "" })),
  };
}