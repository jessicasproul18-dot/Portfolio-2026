import { cache } from "react";
import { readFile } from "fs/promises";
import path from "path";

/** Structured site fields from `public/config.json` (machine-consumed). */
export type SiteConfig = {
  site: string;
  /** Optional browser / SEO title; falls back to `site` when omitted. */
  title?: string;
  tagline?: string;
  description: string;
  email: string;
  email_to?: string;
  email_from: string;
  phone: string;
  address: string;
  site_url?: string;
  /** Optional LinkedIn profile URL for portfolio contact CTAs. */
  linkedin?: string;
  api_endpoint: string;
};

const configPath = path.join(process.cwd(), "public", "config.json");

/**
 * Loads `public/config.json` once per request (React `cache`).
 * Use in Server Components, `generateMetadata`, and route handlers.
 */
export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  const raw = await readFile(configPath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
});
