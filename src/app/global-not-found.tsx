import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteConfig } from "@/lib/siteConfig";
import { Navigation } from "@/components/Sections/Navigation/Navigation";
import { Footer } from "@/components/Sections/Footer/Footer";
import { NotFoundSection } from "@/components/Sections/404/NotFoundSection";
import { PWAInstallProvider } from "@/components/UI/PWAInstallProvider";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: `404 | ${siteConfig.title ?? siteConfig.site}`,
    description: `The page you requested was not found on ${siteConfig.site}.`,
  };
}

export default async function GlobalNotFound() {
  const siteConfig = await getSiteConfig();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <PWAInstallProvider>
          <Navigation
            siteLabel={siteConfig.site}
            phone={siteConfig.phone}
            email={siteConfig.email}
          />
          <NotFoundSection siteLabel={siteConfig.site} />
          <Footer siteConfig={siteConfig} />
        </PWAInstallProvider>
      </body>
    </html>
  );
}
