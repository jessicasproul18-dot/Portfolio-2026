'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Two-column about with optional hover-to-reveal portrait
 * BEST FOR: Portfolio homepage (interactive) or about page (static)
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Two-column grid items-start, portrait left, copy right, CTAs full-width below
 * CONTENT ELEMENTS: Interactive tile portrait or static headshot, optional eyebrow/body, dual CTAs
 * CONVERSION ROLE: Introduce the designer and drive to work or contact
 * IDEAL POSITION: Directly under the hero on the homepage, or under page header on about
 * NOTES / MODIFIERS: interactive prop (default true) toggles hover-reveal tiles/magnifier/ambient dots/cursor waves vs static aspect-[3/4] portrait; click/Enter/Space reveals all tiles; optional reveal CTA appears when fully revealed; reduced-motion shows full static image
 */

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { AboutWaveBackground } from '@/componentsAMP/Sections/Content/AboutWaveBackground';

const GRID = 6;
const TILE_COUNT = GRID * GRID;
/** ~40% of tiles start open so the image peeks through */
const OPEN_RATIO = 0.4;
/** Slower fade when tiles open (hover or click) */
const TILE_FADE_DURATION = 0.55;
/** Delay between each remaining tile on click-to-reveal-all */
const CLICK_REVEAL_STAGGER_MS = 60;

/**
 * Deterministic irregular open-tile set (stable across renders, not a checkerboard).
 * Seeded shuffle so reloads of the module keep the same pattern until hard refresh of logic.
 */
const buildInitialOpenTiles = (): Set<number> => {
  const indices = Array.from({ length: TILE_COUNT }, (_, i) => i);
  let seed = 42;
  const random = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  const openCount = Math.round(TILE_COUNT * OPEN_RATIO);
  return new Set(indices.slice(0, openCount));
};

const INITIAL_OPEN_TILES = buildInitialOpenTiles();

const DOT_SPRING = { stiffness: 70, damping: 16, mass: 0.45 } as const;

const ALL_TILES = new Set(
  Array.from({ length: TILE_COUNT }, (_, index) => index),
);

export type TwoColumnImageRightSectionProps = {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  headingLine3?: string;
  headingLine4?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional second image under the grid; falls back to imageSrc */
  revealedImageSrc?: string;
  /** When false, render a static headshot (no tiles, hover, or ambient dots) */
  interactive?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaDownload?: boolean | string;
  /** CTA shown under the portrait after the image is fully revealed */
  revealCtaLabel?: string;
  revealCtaHref?: string;
  /** Optional second CTA next to the reveal CTA */
  revealSecondaryCtaLabel?: string;
  revealSecondaryCtaHref?: string;
  /** Optional padding/spacing overrides for the inner section */
  className?: string;
};

type StaticPortraitProps = {
  imageSrc: string;
  imageAlt: string;
};

const StaticPortrait = ({ imageSrc, imageAlt }: StaticPortraitProps) => (
  <div className="flex w-full max-w-md flex-col items-center md:items-start lg:max-w-lg">
    <div
      data-reveal-frame
      className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-secondary-950"
    >
      <Image
        alt={imageAlt}
        src={imageSrc}
        quality={80}
        fill
        priority
        sizes="(min-width: 1024px) 32rem, (min-width: 768px) 28rem, 100vw"
        className="rounded-2xl object-cover object-top"
      />
    </div>
  </div>
);

type HoverRevealPortraitProps = {
  imageSrc: string;
  imageAlt: string;
  revealedImageSrc?: string;
  revealCtaLabel?: string;
  revealCtaHref?: string;
  revealSecondaryCtaLabel?: string;
  revealSecondaryCtaHref?: string;
};

const HoverRevealPortrait = ({
  imageSrc,
  imageAlt,
  revealedImageSrc,
  revealCtaLabel,
  revealCtaHref,
  revealSecondaryCtaLabel,
  revealSecondaryCtaHref,
}: HoverRevealPortraitProps) => {
  const reduceMotion = useReducedMotion() ?? false;
  const underSrc = revealedImageSrc ?? imageSrc;
  const gridRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState<Set<number>>(
    () => new Set(INITIAL_OPEN_TILES),
  );
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const revealedRef = useRef(revealed);
  const revealTimeoutsRef = useRef<number[]>([]);

  revealedRef.current = revealed;

  useEffect(() => {
    return () => {
      revealTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const tiles = useMemo(
    () =>
      Array.from({ length: TILE_COUNT }, (_, index) => ({
        index,
        col: index % GRID,
        row: Math.floor(index / GRID),
      })),
    [],
  );

  const handleReveal = useCallback((index: number) => {
    setRevealed((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const handleRevealAll = useCallback(() => {
    revealTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    revealTimeoutsRef.current = [];

    const remaining = Array.from(ALL_TILES).filter(
      (index) => !revealedRef.current.has(index),
    );
    remaining.forEach((index, i) => {
      const id = window.setTimeout(() => {
        handleReveal(index);
      }, i * CLICK_REVEAL_STAGGER_MS);
      revealTimeoutsRef.current.push(id);
    });
  }, [handleReveal]);

  const revealFromPointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const grid = gridRef.current;
      const frame = frameRef.current;
      if (!grid || !frame) return;
      const gridRect = grid.getBoundingClientRect();
      const frameRect = frame.getBoundingClientRect();
      if (gridRect.width <= 0 || gridRect.height <= 0) return;

      const x = event.clientX - gridRect.left;
      const y = event.clientY - gridRect.top;
      setCursorPos({
        x: event.clientX - frameRect.left,
        y: event.clientY - frameRect.top,
      });

      if (x < 0 || y < 0 || x > gridRect.width || y > gridRect.height) return;
      const col = Math.min(GRID - 1, Math.floor((x / gridRect.width) * GRID));
      const row = Math.min(GRID - 1, Math.floor((y / gridRect.height) * GRID));
      handleReveal(row * GRID + col);
    },
    [handleReveal],
  );

  const handleClick = useCallback(() => {
    handleRevealAll();
  }, [handleRevealAll]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      handleRevealAll();
    },
    [handleRevealAll],
  );

  const isFullyRevealed = revealed.size >= TILE_COUNT;
  const showMagnifier = isHovering && !isFullyRevealed;
  const showHelloCursor = isHovering && isFullyRevealed;
  const showRevealCta = Boolean(revealCtaLabel && revealCtaHref);
  const showRevealSecondaryCta = Boolean(
    revealSecondaryCtaLabel && revealSecondaryCtaHref,
  );
  const showRevealCtas = showRevealCta || showRevealSecondaryCta;

  if (reduceMotion) {
    return (
      <div className="contents">
        <div className="relative w-full max-w-md md:col-start-1 md:row-start-1 lg:max-w-lg">
          <div
            data-reveal-frame
            className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary-950"
          >
            <Image
              alt={imageAlt}
              src={underSrc}
              quality={80}
              fill
              priority
              sizes="(min-width: 1024px) 32rem, (min-width: 768px) 28rem, 100vw"
              className="rounded-2xl object-cover object-center"
            />
          </div>
        </div>
        <div className="flex w-full max-w-md flex-col items-start gap-8 md:col-start-1 md:row-start-2 lg:max-w-lg">
          <p className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 opacity-40">
            Hover or click to reveal
          </p>
          {showRevealCtas ? (
            <div className="flex flex-wrap items-center justify-start gap-3 md:gap-4">
              {showRevealCta ? (
                <Button variant="primary" asChild size="sm">
                  <Link href={revealCtaHref!}>
                    <span>{revealCtaLabel}</span>
                  </Link>
                </Button>
              ) : null}
              {showRevealSecondaryCta ? (
                <Button variant="primaryOutline" asChild size="sm">
                  <Link href={revealSecondaryCtaHref!}>
                    <span>{revealSecondaryCtaLabel}</span>
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="contents">
      <div className="relative w-full max-w-md md:col-start-1 md:row-start-1 lg:max-w-lg">
      <div
        ref={frameRef}
        data-reveal-frame
        className={[
          'relative aspect-square w-full overflow-hidden rounded-2xl bg-transparent',
          isHovering ? 'cursor-none' : 'cursor-pointer',
        ].join(' ')}
        role="button"
        tabIndex={0}
        aria-label={`${imageAlt}. Hover or click to reveal.`}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onPointerMove={revealFromPointer}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div
          ref={gridRef}
          className={[
            'absolute inset-0 z-10 grid touch-none',
            isHovering ? 'cursor-none' : 'cursor-pointer',
          ].join(' ')}
          style={{
            gridTemplateColumns: `repeat(${GRID}, 1fr)`,
            gridTemplateRows: `repeat(${GRID}, 1fr)`,
          }}
        >
          {tiles.map(({ index, col, row }) => {
            const isOpen = revealed.has(index);

            return (
              <motion.div
                key={index}
                className="relative h-full w-full overflow-hidden"
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{
                  duration: TILE_FADE_DURATION,
                  ease: [0.22, 0.82, 0.28, 1],
                }}
                aria-hidden="true"
              >
                {/* Full-frame image shifted into this cell — keeps object-cover, no squash */}
                <div
                  className="absolute"
                  style={{
                    width: `${GRID * 100}%`,
                    height: `${GRID * 100}%`,
                    left: `${-col * 100}%`,
                    top: `${-row * 100}%`,
                  }}
                >
                  <Image
                    alt=""
                    src={underSrc}
                    quality={80}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 32rem, (min-width: 768px) 28rem, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {showMagnifier ? (
          <div
            className="pointer-events-none absolute z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/50"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
            }}
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="6.25"
                className="fill-white/50 stroke-primary-600"
                strokeWidth="2.25"
              />
              <path
                d="M15.2 15.2L21 21"
                className="stroke-primary-600"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : null}

        {showHelloCursor ? (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-black px-2.5 py-1 text-xs font-medium tracking-wide text-white"
            style={{ left: cursorPos.x, top: cursorPos.y }}
            aria-hidden="true"
          >
            Hello there!
          </div>
        ) : null}
      </div>
      </div>

      <div className="flex w-full max-w-md flex-col items-start gap-8 md:col-start-1 md:row-start-2 lg:max-w-lg">
        <button
          type="button"
          onClick={handleRevealAll}
          disabled={isFullyRevealed}
          className={[
            'text-left text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 transition-opacity duration-1000 ease-out',
            isFullyRevealed
              ? 'cursor-default opacity-40'
              : 'cursor-pointer opacity-100 hover:text-primary-700',
          ].join(' ')}
        >
          Hover or click to reveal
        </button>

        {showRevealCtas ? (
          <div
            className={[
              'flex flex-wrap items-center justify-start gap-3 transition-opacity duration-1000 ease-out delay-300 md:gap-4',
              isFullyRevealed
                ? 'opacity-100'
                : 'pointer-events-none opacity-0 delay-0',
            ].join(' ')}
            aria-hidden={!isFullyRevealed}
          >
            {showRevealCta ? (
              <Button
                variant="primary"
                asChild={isFullyRevealed}
                size="sm"
                tabIndex={isFullyRevealed ? undefined : -1}
              >
                {isFullyRevealed ? (
                  <Link href={revealCtaHref!}>
                    <span>{revealCtaLabel}</span>
                  </Link>
                ) : (
                  <span>{revealCtaLabel}</span>
                )}
              </Button>
            ) : null}
            {showRevealSecondaryCta ? (
              <Button
                variant="primaryOutline"
                asChild={isFullyRevealed}
                size="sm"
                tabIndex={isFullyRevealed ? undefined : -1}
              >
                {isFullyRevealed ? (
                  <Link href={revealSecondaryCtaHref!}>
                    <span>{revealSecondaryCtaLabel}</span>
                  </Link>
                ) : (
                  <span>{revealSecondaryCtaLabel}</span>
                )}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export function TwoColumnImageRightSection({
  eyebrow,
  headingLine1,
  headingLine2,
  headingLine3,
  headingLine4,
  body,
  imageSrc = '/images/headshot.png',
  imageAlt = 'Jessica Sproul headshot',
  revealedImageSrc,
  interactive = true,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaDownload,
  revealCtaLabel,
  revealCtaHref,
  revealSecondaryCtaLabel,
  revealSecondaryCtaHref,
  className,
}: TwoColumnImageRightSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
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
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion || !interactive) return;
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
    [flushPointer, interactive, reduceMotion],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const secondaryDownloadProp =
    secondaryCtaDownload === true
      ? true
      : typeof secondaryCtaDownload === 'string'
        ? secondaryCtaDownload
        : undefined;

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-24 w-full overflow-x-clip bg-nav/40"
      onPointerMove={interactive ? handlePointerMove : undefined}
    >
      {interactive ? (
        <>
          <AboutWaveBackground
            mouseX={mouseX}
            mouseY={mouseY}
            reduceMotion={reduceMotion}
          />
        </>
      ) : null}

      <section
        className={[
          'relative z-10 container mx-auto px-4 md:px-8 lg:px-12',
          className ?? 'py-24',
        ].join(' ')}
        aria-labelledby={
          headingLine1 || headingLine2 || headingLine3 || headingLine4
            ? 'about-heading'
            : undefined
        }
        aria-label={
          !headingLine1 && !headingLine2 && !headingLine3 && !headingLine4
            ? 'About'
            : undefined
        }
      >
        <div className="grid items-start gap-x-4 gap-y-8 md:grid-cols-2 md:items-center md:gap-x-16 lg:gap-x-16">
          {interactive ? (
            <HoverRevealPortrait
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              revealedImageSrc={revealedImageSrc}
              revealCtaLabel={revealCtaLabel}
              revealCtaHref={revealCtaHref}
              revealSecondaryCtaLabel={revealSecondaryCtaLabel}
              revealSecondaryCtaHref={revealSecondaryCtaHref}
            />
          ) : (
            <div className="relative w-full max-w-md md:col-start-1 md:row-start-1 lg:max-w-lg">
              <StaticPortrait imageSrc={imageSrc} imageAlt={imageAlt} />
            </div>
          )}

          {eyebrow || headingLine1 || headingLine2 || headingLine3 || headingLine4 || body ? (
            <div className="space-y-8 md:col-start-2 md:row-start-1 md:self-center">
              <header>
                {eyebrow ? (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
                    {eyebrow}
                  </p>
                ) : null}
                {headingLine1 || headingLine2 || headingLine3 || headingLine4 ? (
                  <h2
                    id="about-heading"
                    className="max-w-xl text-pretty text-[1.75rem] font-normal leading-snug tracking-tight text-zinc-900 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight"
                  >
                    {headingLine1 ? <span className="block">{headingLine1}</span> : null}
                    {[headingLine2, headingLine3, headingLine4]
                      .filter(Boolean)
                      .join(' ') || null}
                  </h2>
                ) : null}
              </header>
              {body ? (
                <p className="text-base font-light leading-relaxed text-zinc-900 md:text-xl">
                  {body}
                </p>
              ) : null}
            </div>
          ) : null}

          {ctaLabel && ctaHref ? (
            <div className="flex flex-wrap items-center gap-4 pt-4 md:col-span-2 md:gap-6 md:pt-8">
              <Button variant="primary" asChild>
                <Link href={ctaHref}>
                  <span>{ctaLabel}</span>
                </Link>
              </Button>
              {secondaryCtaLabel && secondaryCtaHref ? (
                <Button variant="primaryOutline" asChild>
                  <Link
                    href={secondaryCtaHref}
                    {...(secondaryDownloadProp !== undefined
                      ? { download: secondaryDownloadProp }
                      : {})}
                  >
                    <span>{secondaryCtaLabel}</span>
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
