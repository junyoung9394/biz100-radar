import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { usCompanies } from "@/data/us-companies";
import { jpCompanies } from "@/data/jp-companies";

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
      url: `${baseUrl}/us`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/jp`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
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

  const krCompanyPages: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/kr/company/${company.slug}`,
    lastModified: new Date(company.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const usCompanyPages: MetadataRoute.Sitemap = usCompanies.map((company) => ({
    url: `${baseUrl}/us/company/${company.slug}`,
    lastModified: new Date(company.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75
  }));

  const jpCompanyPages: MetadataRoute.Sitemap = jpCompanies.map((company) => ({
    url: `${baseUrl}/jp/company/${company.slug}`,
    lastModified: new Date(company.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75
  }));

  return [
    ...staticPages,
    ...krCompanyPages,
    ...usCompanyPages,
    ...jpCompanyPages
  ];
}