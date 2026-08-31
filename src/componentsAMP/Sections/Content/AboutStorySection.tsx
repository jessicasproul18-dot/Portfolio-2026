'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Long-form about story with alternating photo and copy blocks
 * BEST FOR: Portfolio about pages with biography and lifestyle imagery
 * VISUAL STYLE: Modern, minimal, professional, and editorial
 * LAYOUT: Stacked narrative blocks; split image/text rows that alternate; closing photo grid
 * CONTENT ELEMENTS: Headshot intro, career story, internship and current role, outside-of-work gallery
 * CONVERSION ROLE: Build trust and personality for hiring managers
 * IDEAL POSITION: Main content of the About page after PageHeader
 * NOTES / MODIFIERS: Cursor-reactive wave background with crests loosely aligned to Background / How I started / Experience; 6rem section top/bottom and 3rem gaps between story blocks; static images; wrap layout for market story; lifestyle photo carousel
 */

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { AboutLifestyleCarousel } from '@/componentsAMP/Sections/Content/AboutLifestyleCarousel';
import { AboutWaveBackground } from '@/componentsAMP/Sections/Content/AboutWaveBackground';
import { Button } from '@/components/UI/Button';

const WAVE_SPRING = { stiffness: 70, damping: 16, mass: 0.45 } as const;

type StoryBlock = {
  eyebrow: string;
  title?: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageOnRight?: boolean;
  /** Float the image so copy wraps around it (editorial fill) */
  wrapTextAroundImage?: boolean;
  /** Accent bar beside the last paragraph */
  accentLastParagraph?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaDownload?: boolean | string;
};

const STORY_BLOCKS: StoryBlock[] = [
  {
    eyebrow: 'Background',
    title: 'Study of people, practice of design',
    imageSrc: '/images/headshot.png',
    imageAlt: 'Jessica Sproul headshot',
    imageOnRight: true,
    ctaLabel: 'Contact',
    ctaHref: '/#contact',
    secondaryCtaLabel: 'View resume',
    secondaryCtaHref: '/resume/jessica-sproul-resume.pdf',
    secondaryCtaDownload: true,
    paragraphs: [
      'I am a product designer focused on UX, with 3 years of experience that spans from visual design to front-end development.',
      'I would describe myself as a UX/UI designer with a wide range of skills. I have a graphic design degree with a focus in UX design, and an anthropology degree from the University of Oregon. My mix of sociological and design knowledge helps me shape product flows that stay grounded in human empathy while supporting business goals like adoption, retention, and trust.',
    ],
  },
  {
    eyebrow: 'How I started',
    imageSrc: '/images/about/market-selling.png',
    imageAlt: 'Jessica selling Creative Chaos Prints at a local market',
    imageOnRight: false,
    wrapTextAroundImage: true,
    paragraphs: [
      'I started my design career selling my own artwork at weekend markets in Seattle. A few months in, I began my art degree and knew design was the path I wanted. Alongside school I worked as an artist\'s assistant, freelanced, and took on small design jobs for businesses I met around those markets.',
      'I later became a marketing administrator for a catering company, covering whatever they needed: menus, product labels, social posts, website content, and magazine spreads for local wedding publications. That role taught me graphic design in practice and how to market a small business.',
      'When it came time to choose a focus for my graphic design degree, I chose UX. I wanted to build products that help people reach the services they need. I love how sociology shows up in user research and behavior, and designing informed, accessible products feels like the work I am meant to do.',
    ],
  },
  {
    eyebrow: 'Experience',
    accentLastParagraph: true,
    paragraphs: [
      'I later joined TunePact, an AI music marketing startup, as a UX intern. That is where Figma became part of my everyday craft beyond school projects. Working closely with the CEO, I designed and tested prototypes with independent musicians and shaped the interfaces for their Biolink and Tunepage. We met often, sometimes twice a week, to talk through branding, business identity, and user needs.',
      'I moved to Portland in 2025 and joined the web development team at Advantage Media Partners. There I use my UX background to design and build end-to-end web products that help businesses improve lead generation and give users clearer paths to what they need.',
      'I help design, develop, and launch sites with WordPress and Cursor, from discovery through production: information architecture, empathy mapping, wireframing, UX and UI design, the build itself, client collaboration, and product testing. I have shipped work for clients across industries, from dog breeders to expert witnesses to naturopaths.',
      'My experience across traditional design, graphic design, UX, web, and development gives me a clear sense of what users need, what presents well, and what actually works. I can take a product from start to finish in a way that supports client retention and helps people find what they are looking for.',
    ],
  },
];

const LIFESTYLE_IMAGES = [
  {
    src: '/images/about/dogs.png',
    alt: 'Jessica hiking with her dogs',
  },
  {
    src: '/images/about/beach-2.png',
    alt: 'Jessica at the beach with friends',
  },
  {
    src: '/images/about/rome.png',
    alt: 'Jessica traveling in Rome',
  },
  {
    src: '/images/about/beach-1.png',
    alt: 'Jessica on a rainy beach day with coffee',
  },
];

const StoryCopy = ({
  eyebrow,
  title,
  paragraphs,
  accentLastParagraph = false,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaDownload,
}: Pick<
  StoryBlock,
  | 'eyebrow'
  | 'title'
  | 'paragraphs'
  | 'accentLastParagraph'
  | 'ctaLabel'
  | 'ctaHref'
  | 'secondaryCtaLabel'
  | 'secondaryCtaHref'
  | 'secondaryCtaDownload'
>) => {
  const secondaryDownloadProp =
    secondaryCtaDownload === true
      ? true
      : typeof secondaryCtaDownload === 'string'
        ? secondaryCtaDownload
        : undefined;

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
        {eyebrow}
      </p>
      {title ? (
        <h2 className="text-2xl font-normal tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
          {title}
        </h2>
      ) : null}
      {paragraphs.map((paragraph, index) => {
        const isLast = index === paragraphs.length - 1;
        const showAccent = accentLastParagraph && isLast;

        return (
          <p
            key={paragraph.slice(0, 48)}
            className={[
              'text-base leading-relaxed text-zinc-800 md:text-lg',
              showAccent
                ? 'mt-[2rem] border-l-4 border-primary-600 pl-4 font-medium sm:pl-5 md:pl-6'
                : 'font-light',
            ].join(' ')}
          >
            {paragraph}
          </p>
        );
      })}
      {ctaLabel && ctaHref ? (
        <div className="flex flex-wrap items-center gap-3 pt-1 md:gap-4">
          <Button asChild variant="primary" size="sm">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          {secondaryCtaLabel && secondaryCtaHref ? (
            <Button asChild variant="primaryOutline" size="sm">
              <Link
                href={secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                {...(secondaryDownloadProp !== undefined
                  ? { download: secondaryDownloadProp }
                  : {})}
              >
                {secondaryCtaLabel}
              </Link>
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export function AboutStorySection() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<Array<HTMLElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const [waveAnchors, setWaveAnchors] = useState<number[] | undefined>();

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const mouseX = useSpring(rawX, WAVE_SPRING);
  const mouseY = useSpring(rawY, WAVE_SPRING);

  const flushPointer = useCallback(() => {
    rafRef.current = null;
    const pending = pendingRef.current;
    if (!pending) return;
    rawX.set(pending.x);
    rawY.set(pending.y);
  }, [rawX, rawY]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
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

  const updateWaveAnchors = useCallback(() => {
    const container = sectionRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    if (containerRect.height <= 0) return;

    const next = STORY_BLOCKS.map((_, index) => {
      const block = blockRefs.current[index];
      if (!block) return 0.2 + index * 0.28;
      const blockRect = block.getBoundingClientRect();
      // First crest sits under the Background image + buttons so the
      // light wash stays behind that block; later crests track section tops.
      const y =
        index === 0
          ? blockRect.bottom - containerRect.top
          : blockRect.top - containerRect.top;
      return Math.min(0.92, Math.max(0.05, y / containerRect.height));
    });

    setWaveAnchors((prev) => {
      if (
        prev &&
        prev.length === next.length &&
        prev.every((value, i) => Math.abs(value - (next[i] ?? 0)) < 0.005)
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    updateWaveAnchors();
  }, [updateWaveAnchors]);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updateWaveAnchors();
    });
    observer.observe(container);
    blockRefs.current.forEach((block) => {
      if (block) observer.observe(block);
    });

    window.addEventListener('resize', updateWaveAnchors);
    // Images can change block heights after load
    window.addEventListener('load', updateWaveAnchors);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWaveAnchors);
      window.removeEventListener('load', updateWaveAnchors);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateWaveAnchors]);

  return (
    <>
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-nav/40 px-4 py-[6rem] md:px-8 lg:px-12"
      onPointerMove={handlePointerMove}
    >
      <AboutWaveBackground
        mouseX={mouseX}
        mouseY={mouseY}
        reduceMotion={reduceMotion}
        waveAnchors={waveAnchors}
      />

      <div className="relative z-10 space-y-[3rem]">
      {STORY_BLOCKS.map((block, index) => {
        return (
        <section
          key={block.eyebrow}
          ref={(node) => {
            blockRefs.current[index] = node;
          }}
        >
          {block.wrapTextAroundImage && block.imageSrc ? (
            <div className="container mx-auto">
              <div className="flow-root">
                <div
                  className={[
                    'relative mb-5 aspect-[6/5] w-full overflow-hidden rounded-2xl bg-zinc-100 sm:mb-0 sm:w-[46%] md:w-[40%] lg:w-[36%]',
                    block.imageOnRight
                      ? 'sm:float-right sm:ml-8 md:ml-10 lg:ml-12'
                      : 'sm:float-left sm:mr-8 md:mr-10 lg:mr-12',
                  ].join(' ')}
                >
                  <Image
                    src={block.imageSrc}
                    alt={block.imageAlt ?? ''}
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-4 md:space-y-5">
                  <div className="space-y-2 md:space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
                      {block.eyebrow}
                    </p>
                    {block.title ? (
                      <h2 className="text-2xl font-normal tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
                        {block.title}
                      </h2>
                    ) : null}
                  </div>

                  {block.paragraphs.slice(0, -1).map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base font-light leading-relaxed text-zinc-800 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {block.paragraphs.length > 0 ? (
                <div className="mt-[3rem]">
                  <p className="border-l-4 border-primary-600 pl-4 text-base font-medium leading-relaxed text-zinc-800 sm:pl-5 md:pl-6 md:text-lg">
                    {block.paragraphs[block.paragraphs.length - 1]}
                  </p>
                </div>
              ) : null}
            </div>
          ) : block.imageSrc ? (
            <div className="container mx-auto grid items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
              <div
                className={[
                  'relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-zinc-100',
                  block.imageOnRight ? 'md:order-2' : 'md:order-1',
                ].join(' ')}
              >
                <Image
                  src={block.imageSrc}
                  alt={block.imageAlt ?? ''}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-[center_28%]"
                />
              </div>

              <div
                className={[
                  'flex max-w-xl flex-col gap-4 md:gap-5',
                  block.imageOnRight ? 'md:order-1' : 'md:order-2',
                ].join(' ')}
              >
                <StoryCopy
                  eyebrow={block.eyebrow}
                  title={block.title}
                  paragraphs={block.paragraphs}
                  accentLastParagraph={block.accentLastParagraph}
                  ctaLabel={block.ctaLabel}
                  ctaHref={block.ctaHref}
                  secondaryCtaLabel={block.secondaryCtaLabel}
                  secondaryCtaHref={block.secondaryCtaHref}
                  secondaryCtaDownload={block.secondaryCtaDownload}
                />
              </div>
            </div>
          ) : (
            <div className="container mx-auto">
              <div className="flex flex-col gap-4 md:gap-5">
                <StoryCopy
                  eyebrow={block.eyebrow}
                  title={block.title}
                  paragraphs={block.paragraphs}
                  accentLastParagraph={block.accentLastParagraph}
                  ctaLabel={block.ctaLabel}
                  ctaHref={block.ctaHref}
                  secondaryCtaLabel={block.secondaryCtaLabel}
                  secondaryCtaHref={block.secondaryCtaHref}
                  secondaryCtaDownload={block.secondaryCtaDownload}
                />
              </div>
            </div>
          )}
        </section>
        );
      })}
      </div>
    </div>

      <section className="border-t border-zinc-200 bg-white px-4 py-[6rem] md:px-8 lg:px-12">
        <div className="container mx-auto space-y-[3rem]">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-600">
              Outside of work
            </p>
            <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
              Away from the screen I love running, hiking with my dogs, beach days, time with
              friends, and traveling whenever I can.
            </p>
          </div>

          <AboutLifestyleCarousel images={LIFESTYLE_IMAGES} />
        </div>
      </section>
    </>
  );
}
