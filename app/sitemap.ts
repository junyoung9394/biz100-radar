import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { usCompanies } from "@/data/us-companies";
import { jpCompanies } from "@/data/jp-companies";
import { industryCategories } from "@/lib/industry-categories";

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
      url: `${baseUrl}/ranking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/kr/industry`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/kr/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
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

  const today = new Date();

  const krCompanyPages: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${baseUrl}/kr/company/${company.slug}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const usCompanyPages: MetadataRoute.Sitemap = usCompanies.map((company) => ({
    url: `${baseUrl}/us/company/${company.slug}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.75
  }));

  const jpCompanyPages: MetadataRoute.Sitemap = jpCompanies.map((company) => ({
    url: `${baseUrl}/jp/company/${company.slug}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.75
  }));

  const industryPages: MetadataRoute.Sitemap = industryCategories.map((c) => ({
    url: `${baseUrl}/kr/industry/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [
    ...staticPages,
    ...industryPages,
    ...krCompanyPages,
    ...usCompanyPages,
    ...jpCompanyPages
  ];
}