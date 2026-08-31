import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

export const dynamic = "force-static";

const getBaseUrl = async (): Promise<string | null> => {
  const siteConfig = await getSiteConfig();
  const siteUrl = siteConfig.site_url?.trim();

  if (!siteUrl) {
    return null;
  }

  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getBaseUrl();
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/offline/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.1,
    },
  ];
}
