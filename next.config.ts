import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  // 같은 회사가 두 번 등록돼 있던 페이지와 종목코드가 잘못된 페이지를 정리하면서,
  // 이미 검색에 잡힌 주소는 남아 있는 페이지로 넘깁니다.
  async redirects() {
    const merged: Record<string, string> = {
      "samsung-cnt": "samsung-c-and-t",
      "sk-inc": "sk",
      "kt-corporation": "kt",
      "samsung-fire-marine": "samsung-fire",
      shinsegae: "shinsegye",
      "ls-corp": "ls",
      "lotte-holdings": "lotte-holdings-korea",
      "samsung-electro-mechanics": "semco"
    };

    return [
      ...Object.entries(merged).map(([from, to]) => ({
        source: `/kr/company/${from}`,
        destination: `/kr/company/${to}`,
        permanent: true
      })),
      {
        source: "/kr/company/hanwha-impact",
        destination: "/kr",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*.(jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      }
    ];
  }
};

export default nextConfig;
