"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  isMobile?: boolean;
  href: LinkProps["href"];
  children: ReactNode;
} & Omit<LinkProps, "href" | "children">;

export default function NavLink({
  isMobile = false,
  href,
  children,
  ...props
}: Props) {
  const path = usePathname();
  const pathDependentClasses =
    path !== href ? "text-muted" : "outline-bottom-2";

  const desktopLinkClasses = "text-xs font-label font-bold tracking-wider";
  const desktopIndicatorClasses = "size-1 -left-2.5";

  const mobileLinkClasses = "text-2xl font-heading";
  const mobileIndicatorClasses = "size-1.5 -left-4";

  return (
    <Link
      href={href}
      className={`relative ${isMobile ? mobileLinkClasses : desktopLinkClasses} uppercase ${pathDependentClasses} hover:text-foreground`}
      {...props}
    >
      {path === href && (
        <div
          className={`absolute ${isMobile ? mobileIndicatorClasses : desktopIndicatorClasses} top-1/2 -translate-y-1/2 bg-accent`}
        ></div>
      )}
      {children}
    </Link>
  );
}
