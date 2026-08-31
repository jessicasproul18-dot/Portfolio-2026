"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mail, MessageCircle, Phone } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { cx } from "@/lib/utils";
import { isFilledSiteField } from "@/lib/siteFieldUtils";

const mobileTabBarVariants = tv({
  base: [
    "fixed bottom-0 left-0 right-0 z-50 md:hidden",
    "flex items-center justify-around border-t",
    "pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
    "tracking-wide text-xs uppercase",
  ],
  variants: {
    variant: {
      primary: [
        "bg-primary-400",
        "text-primary-foreground",
        "border-primary-500",
      ],
      secondary: [
        "bg-secondary",
        "text-secondary-foreground",
        "border-secondary-600",
      ],
      light: [
        "bg-white",
        "text-zinc-900",
        "border-zinc-200",
      ],
      dark: [
        "bg-zinc-900",
        "text-zinc-100",
        "border-zinc-700",
        "divide-x divide-zinc-700/10"
      ],
    },
  },
  defaultVariants: {
    variant: "dark",
  },
});

const tabLinkBase =
  "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-opacity hover:opacity-90 active:opacity-80 gap-2";

/** Mirrors Navigation scroll thresholds: inverse behavior (show on scroll down, hide on scroll up). */
const SCROLL_TOP_THRESHOLD = 10;
const SCROLL_DOWN_SHOW_AFTER = 100;

interface MobileTabBarProps
  extends React.ComponentPropsWithoutRef<"nav">,
    VariantProps<typeof mobileTabBarVariants> {
  /** Email link (mailto:). */
  contactEmail?: string;
  /** Phone link (tel:). */
  contactPhone?: string;
  /** Message / chat link (e.g. #message or external URL). */
  messageLink?: string;
}

export function MobileTabBar({
  variant = "dark",
  className,
  contactEmail,
  contactPhone,
  messageLink,
  ...props
}: MobileTabBarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showEmailTab = isFilledSiteField(contactEmail);
  const showPhoneTab = isFilledSiteField(contactPhone);
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (scrollTop < SCROLL_TOP_THRESHOLD) {
        setIsScrollVisible(false);
      } else if (scrollTop > lastScrollY && scrollTop > SCROLL_DOWN_SHOW_AFTER) {
        setIsScrollVisible(true);
      } else if (scrollTop < lastScrollY) {
        setIsScrollVisible(false);
      }

      lastScrollYRef.current = scrollTop;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Mobile quick links"
      className={cx(
        mobileTabBarVariants({ variant }),
        "transition-transform duration-300 ease-out",
        isScrollVisible ? "translate-y-0" : "translate-y-full",
        className
      )}
      {...props}
    >
      {isHome ? (
        <button
          type="button"
          onClick={handleHomeClick}
          className={tabLinkBase}
          aria-label="Home"
        >
          <Home className="h-5 w-5 shrink-0" aria-hidden />
          <span>Home</span>
        </button>
      ) : (
        <Link href="/" className={tabLinkBase} aria-label="Home">
          <Home className="h-5 w-5 shrink-0" aria-hidden />
          <span>Home</span>
        </Link>
      )}
      {showEmailTab ? (
      <a
        href={contactEmail}
        className={tabLinkBase}
        aria-label="Email"
      >
        <Mail className="h-5 w-5 shrink-0" aria-hidden />
        <span className="text-xs uppercase tracking-wide">Email</span>
      </a>
      ) : null}
      {showPhoneTab ? (
      <a
        href={contactPhone}
        className={tabLinkBase}
        aria-label="Call"
      >
        <Phone className="h-5 w-5 shrink-0" aria-hidden />
        <span>Call</span>
      </a>
      ) : null}
      <a
        href={messageLink}
        className={tabLinkBase}
        aria-label="Message"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
        <span>Message</span>
      </a>
    </nav>
  );
}

MobileTabBar.displayName = "MobileTabBar";

export { mobileTabBarVariants, type MobileTabBarProps };
