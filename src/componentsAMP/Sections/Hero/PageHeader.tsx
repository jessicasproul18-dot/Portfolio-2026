'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Interior page hero with title and breadcrumbs
 * BEST FOR: About, contact, project, and other inner pages that need clear hierarchy below the main nav
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Full-width band with centered container; breadcrumb row with large page title
 * CONTENT ELEMENTS: Soft ambient dots, breadcrumb trail, H1 page title
 * CONVERSION ROLE: Orient visitors and reinforce site structure before main content
 * IDEAL POSITION: First section on inner pages (below global navigation)
 * NOTES / MODIFIERS: Cursor-reactive ambient dots behind title; breadcrumb current page as text only
 */

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AboutWaveBackground } from '@/componentsAMP/Sections/Content/AboutWaveBackground';

const DOT_SPRING = { stiffness: 70, damping: 16, mass: 0.45 } as const;

export type PageHeaderBreadcrumb = {
  label: string;
  /** Omit for the current page (renders as plain text). */
  href?: string;
};

export type PageHeaderProps = {
  title: string;
  breadcrumbs: PageHeaderBreadcrumb[];
};

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const mouseX = useSpring(rawX, DOT_SPRING);
  const mouseY = useSpring(rawY, DOT_SPRING);

  const flushPointer = useCallback(() => {
    rafRef.current = null;
    const pending = pendingRef.current;
    if (!pending) return;
    rawX.set(pending.x);
    rawY.set(pending.y);
  }, [rawX, rawY]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pendingRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(flushPointer);
    },
    [flushPointer, reduceMotion],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="page-header-title"
      className="relative overflow-hidden border-b border-zinc-200 bg-white px-4 pt-28 md:pt-32 md:px-8 lg:px-12"
      onPointerMove={handlePointerMove}
    >
      <AboutWaveBackground
        mouseX={mouseX}
        mouseY={mouseY}
        reduceMotion={reduceMotion}
        dotsOnly
      />

      <div className="relative z-10 container mx-auto max-w-[1280px] pb-6 md:pb-8">
        <h1
          id="page-header-title"
          className="text-balance text-3xl font-normal uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl"
        >
          {title}
        </h1>
      </div>

      <nav
        aria-label="Breadcrumb"
        className="relative z-10 container mx-auto max-w-[1280px] pb-[3rem]"
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600 md:gap-x-3 md:text-base">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li
                key={`${crumb.label}-${index}`}
                className="flex items-center gap-x-2 md:gap-x-3"
              >
                {index > 0 && (
                  <ChevronRight
                    className="size-4 shrink-0 text-zinc-400"
                    aria-hidden
                    strokeWidth={2}
                  />
                )}
                {!isLast && crumb.href ? (
                  crumb.href.includes('#') ? (
                    <a
                      href={crumb.href}
                      className="font-medium text-zinc-700 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="font-medium text-zinc-700 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  )
                ) : (
                  <span
                    className={
                      isLast
                        ? 'font-medium text-zinc-900'
                        : 'font-medium text-zinc-700'
                    }
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}
