'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Global header / navigation
 * BEST FOR: Multi-page portfolio sites with sticky desktop links
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Logo left; desktop phone + email icon buttons + nav links; mobile hamburger drawer
 * CONTENT ELEMENTS: Logo, phone icon, email icon, Home/About/Portfolio/Contact links, mobile menu
 * CONVERSION ROLE: Navigation, primary CTAs (call, email)
 * IDEAL POSITION: Top of page, fixed
 * NOTES / MODIFIERS: Fixed white bar with dark text; shadow appears after scroll; hamburger only on smaller screens
 */

import { useState, useEffect, useRef, useCallback } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '../../../components/UI/Button';
import { HamburgerButton } from '../../../components/UI/HamburgerButton';
import {
  MobileMenu,
  MobileMenuBody,
  MobileMenuFooter,
  MobileMenuHeader,
  MobileMenuLink,
  MobileMenuNav,
  MobileMenuPanel,
  MobileMenuTitle,
  MobileMenuTrigger,
} from '../../../components/UI/MobileMenu';
import { ScrollArea } from '../../../components/UI/ScrollArea';
import { getContactHref, getNavigationItems } from '@/lib/navigation';
import { AgentProfile } from '../../../components/UI/AgentProfile';

const SCROLL_EPSILON = 2;

export type NavigationProps = {
  siteLabel: string;
  phone: string;
  email: string;
};

export function Navigation({ siteLabel, phone, email }: NavigationProps) {
  const pathname = usePathname();
  const navItems = getNavigationItems(pathname);
  const contactHref = getContactHref(pathname);
  const telHref = `tel:${phone}`;
  const mailHref = `mailto:${email}`;
  const [isScrolled, setIsScrolled] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportReady, setViewportReady] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(false);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const navTextClass = 'text-zinc-900';
  const navMutedClass = 'text-zinc-900 hover:opacity-70';

  const updateScrollIndicators = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollHeight, clientHeight, scrollTop } = el;
    const hasOverflow = scrollHeight > clientHeight;
    setShowBottomIndicator(
      hasOverflow && scrollTop + clientHeight < scrollHeight - SCROLL_EPSILON
    );
    setShowTopIndicator(hasOverflow && scrollTop > SCROLL_EPSILON);
  }, []);

  const viewportRefCallback = useCallback((el: HTMLDivElement | null) => {
    viewportRef.current = el;
    if (el) setViewportReady(true);
  }, []);

  useEffect(() => {
    if (!viewportReady || !viewportRef.current) return;
    updateScrollIndicators();
    const ro = new ResizeObserver(updateScrollIndicators);
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [viewportReady, updateScrollIndicators]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="flex h-[80px] w-full items-center justify-between gap-6 px-4 py-6 md:px-5 lg:px-6">
        <div className="shrink-0">
          <div
            className={`text-lg font-normal uppercase tracking-[2px] ${navTextClass}`}
          >
            <Link href="/">{siteLabel}</Link>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-8 lg:flex">
          <div className="flex items-center gap-2">
            <Button variant="primary" size="md" icon asChild>
              <a href={telHref} aria-label={`Call ${phone}`}>
                <Phone className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button variant="primary" size="md" icon asChild>
              <a href={mailHref} aria-label={`Email ${email}`}>
                <Mail className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-normal uppercase tracking-[1.5px] transition-opacity ${navMutedClass}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="lg:hidden">
          <MobileMenu>
            <MobileMenuTrigger asChild>
              <HamburgerButton
                title="Open navigation"
                className="text-zinc-900"
              />
            </MobileMenuTrigger>
            <MobileMenuPanel>
              <MobileMenuHeader className="bg-zinc-900">
                <AgentProfile
                  variant="dark"
                  ownerName="Alexandra Reed"
                  businessName={siteLabel}
                />
              </MobileMenuHeader>
              <div className="relative flex min-h-0 grow flex-col">
                <ScrollArea
                  className="min-h-0 grow"
                  viewportRef={viewportRefCallback}
                  onViewportScroll={updateScrollIndicators}
                >
                  <MobileMenuBody>
                    <MobileMenuTitle>Menu</MobileMenuTitle>
                    <MobileMenuNav>
                      {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <MobileMenuLink
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3"
                          >
                            {Icon ? (
                              <Icon className="h-5 w-5 shrink-0" aria-hidden />
                            ) : null}
                            <span>{item.label}</span>
                          </MobileMenuLink>
                        );
                      })}
                    </MobileMenuNav>
                  </MobileMenuBody>
                </ScrollArea>
                {showTopIndicator && (
                  <div
                    className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-8 bg-gradient-to-b from-white to-transparent"
                    aria-hidden
                  />
                )}
                {showBottomIndicator && (
                  <div
                    className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 flex flex-col items-center"
                    aria-hidden
                  >
                    <div className="flex h-4 w-full items-center justify-center bg-gradient-to-t from-white to-transparent">
                      <ChevronDown className="h-4 w-4 -mt-5 shrink-0 text-zinc-400" />
                    </div>
                  </div>
                )}
              </div>
              <MobileMenuFooter>
                <MobileMenuNav orientation="vertical">
                  <MobileMenuLink href={telHref}>
                    <Phone className="h-5 w-5 shrink-0" aria-hidden />
                    <span>{phone}</span>
                  </MobileMenuLink>
                  <MobileMenuLink href={mailHref}>
                    <Mail className="h-5 w-5 shrink-0" aria-hidden />
                    <span>{email}</span>
                  </MobileMenuLink>
                  <MobileMenuLink
                    href={contactHref}
                    className="mx-0 my-1.5 md:mx-6 md:my-3"
                  >
                    <Button variant="primary" className="w-full">
                      Contact
                    </Button>
                  </MobileMenuLink>
                </MobileMenuNav>
              </MobileMenuFooter>
            </MobileMenuPanel>
          </MobileMenu>
        </div>
      </div>
    </div>
  );
}
