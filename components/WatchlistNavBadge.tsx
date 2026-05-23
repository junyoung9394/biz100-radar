"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "biz100-watchlist";

function getCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export default function WatchlistNavBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCount());

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setCount(getCount());
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (count === 0) return null;

  return (
    <Link href="/#watchlist" className="watchlist-nav-badge">
      ★ {count}
    </Link>
  );
}
