import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollPosition from "@/components/UI/ScrollPosition";
import ScrollToTop from "@/components/UI/ScrollToTop";
import ScrollToAnchor from "@/components/UI/ScrollToAnchor";
import ServiceWorkerRegister from "@/components/UI/ServiceWorkerRegister";
import { PWAInstallProvider } from "@/components/UI/PWAInstallProvider";
import { MobileTabBar } from "@/components/UI/MobileTabBar";
import { Footer } from "@/components/Sections/Footer/Footer";
import { Navigation } from "@/components/Sections/Navigation/Navigation";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  return {
    title: siteConfig.title ?? siteConfig.site,
    description: siteConfig.description,
    manifest: "/manifest.json",
    icons: {
      icon: [
        {
          url: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      shortcut: "/icons/icon-192x192.png",
      apple: [
        {
          url: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <html lang="en" className="relative scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
        suppressHydrationWarning
      >
        <PWAInstallProvider>
          <ScrollToAnchor />
          <ServiceWorkerRegister />
          <div id='topOfPage' className='absolute -top-96'>Top of page</div>
          <ScrollToTop />
          <Navigation
            siteLabel={siteConfig.site}
            phone={siteConfig.phone}
            email={siteConfig.email}
          />
          <ScrollPosition />
          {children}
          <MobileTabBar
            contactEmail={`mailto:${siteConfig.email}`}
            contactPhone={`tel:${siteConfig.phone}`}
            messageLink="/#contact"
          />
          <Footer className="pb-22 md:pb-0" siteConfig={siteConfig} />
        </PWAInstallProvider>
      </body>
    </html>
  );
}
