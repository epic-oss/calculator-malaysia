import { MetadataRoute } from "next";
import { calculators } from "@/data/calculators";

const BASE_URL = "https://calculatormalaysia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Homepage
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // All calculator pages from data
  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${BASE_URL}${calc.slug.endsWith("/") ? calc.slug.slice(0, -1) : calc.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: calc.featured ? 0.9 : 0.8,
  }));

  return [...staticPages, ...calculatorPages];
}
