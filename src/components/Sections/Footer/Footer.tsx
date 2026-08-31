'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Site footer with links and contact
 * BEST FOR: Every page, global footer
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Three-column grid (brand, explore, contact), bottom copyright bar
 * CONTENT ELEMENTS: Name, nav links, contact info, copyright
 * CONVERSION ROLE: Navigation, contact, trust
 * IDEAL POSITION: Bottom of page
 * NOTES / MODIFIERS: Contact explore link scrolls to #contact on home/about
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { getNavigationItems } from '@/lib/navigation';
import type { SiteConfig } from '@/lib/siteConfig';

type FooterProps = {
  className?: string;
  siteConfig: Pick<SiteConfig, 'site' | 'description' | 'email' | 'phone' | 'address'>;
};

export function Footer({ className, siteConfig }: FooterProps) {
  const pathname = usePathname();
  const navItems = getNavigationItems(pathname);
  const { site, email, phone, address } = siteConfig;
  const mailHref = `mailto:${email}`;
  const telHref = `tel:${phone}`;
  const currentYear = format(new Date(), 'yyyy');

  return (
    <div className={`bg-white text-zinc-900 overflow-hidden ${className}`}>
      <div className="container mx-auto py-6 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-normal uppercase tracking-[2px] text-primary-500">
              <Link href="/" className="transition-colors hover:text-primary-600">
                {site}
              </Link>
            </h3>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold uppercase tracking-wide">Explore</h4>
            <div className="space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-zinc-600 transition-colors hover:text-primary-500"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold uppercase tracking-wide">Contact</h4>
            <div className="space-y-4">
              <a
                href={mailHref}
                className="flex items-center space-x-2 text-zinc-600 transition-colors hover:text-primary-500"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <span>{email}</span>
              </a>
              <a
                href={telHref}
                className="flex items-center space-x-2 text-zinc-600 transition-colors hover:text-primary-500"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <span>{phone}</span>
              </a>
              <p className="whitespace-pre-line text-zinc-600">{address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 bg-zinc-900">
        <div className="container mx-auto px-4 py-6 md:px-8 lg:px-12">
          <div className="text-sm text-white">
            Copyright © {currentYear} {site}
          </div>
        </div>
      </div>
    </div>
  );
}
