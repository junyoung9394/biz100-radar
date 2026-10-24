"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import WatchlistNavBadge from "@/components/WatchlistNavBadge";

const NAV_ITEMS = [
  { href: "/kr", label: "한국 기업" },
  { href: "/us", label: "미국 기업" },
  { href: "/jp", label: "일본 기업" },
  { href: "/kr/industry", label: "업종별" },
  { href: "/kr/compare", label: "기업 비교" },
  { href: "/ranking", label: "재계순위" },
  { href: "/disclaimer", label: "면책문구" }
];

function isActive(pathname: string, href: string) {
  if (href === "/kr") {
    return pathname === "/kr" || pathname.startsWith("/kr/company");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="nav" aria-label="주요 메뉴">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "nav-link active" : "nav-link"}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <WatchlistNavBadge />
    </nav>
  );
}
