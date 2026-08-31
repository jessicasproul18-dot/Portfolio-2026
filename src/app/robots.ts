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

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,
  };
}
