import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://biz100.luckygrampus.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/kr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];

  const companyPages: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/kr/company/${company.slug}`,
    lastModified: new Date(company.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  return [...staticPages, ...companyPages];
}
