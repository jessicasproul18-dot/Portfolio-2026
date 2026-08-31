'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Full-bleed contact with two-column details
 * BEST FOR: Portfolio landing pages
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Full-width headline and intro, then two equal columns (Get In Touch left, Connect With Me right)
 * CONTENT ELEMENTS: Email, phone, location, LinkedIn link
 * CONVERSION ROLE: Drive connection and conversation
 * IDEAL POSITION: Before the footer
 * NOTES / MODIFIERS: Cursor-reactive wave background (shared with homepage hero); no contact form or business hours; first-person portfolio copy
 */

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LinkedInIcon } from '@/components/svg-icons';
import { AboutWaveBackground } from '@/componentsAMP/Sections/Content/AboutWaveBackground';
import type { SiteConfig } from '@/lib/siteConfig';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const WAVE_SPRING = { stiffness: 70, damping: 16, mass: 0.45 } as const;

type FullBleedParallaxTwoColumnContactFormProps = {
  siteConfig: Pick<SiteConfig, 'email' | 'phone' | 'address'> & {
    linkedin?: string;
  };
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.15, ease },
  }),
};

export function FullBleedParallaxTwoColumnContactForm({
  siteConfig,
}: FullBleedParallaxTwoColumnContactFormProps) {
  const { email, phone, address } = siteConfig;
  const mailHref = `mailto:${email}`;
  const telHref = `tel:${phone}`;
  const linkedinHref = siteConfig.linkedin?.trim() || 'https://www.linkedin.com';

  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

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
      id="contact"
      className="scroll-mt-24 bg-nav/40 text-zinc-900 relative overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <AboutWaveBackground
        mouseX={mouseX}
        mouseY={mouseY}
        reduceMotion={reduceMotion}
      />

      <div className="container mx-auto relative z-10 px-4 py-[6rem] md:px-8 lg:px-12">
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 md:items-start"
          >
            <div>
              <h2 className="text-3xl font-normal uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                Get In Touch
              </h2>
            </div>
            <div className="flex flex-col justify-end h-full">
              <p className="mt-auto text-base font-light leading-relaxed text-zinc-800 md:text-xl">
                Open to UX, product design, and related opportunities. Reach out by email, phone, or
                LinkedIn.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
            <motion.div className="flex flex-col min-h-0 lg:h-full" variants={fadeInUp} custom={1}>
              <div className="flex flex-1 min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white/80 p-8 backdrop-blur-sm md:p-10">
                <h3 className="mb-6 text-lg font-semibold uppercase tracking-tight text-zinc-900 md:text-xl">
                  Get In Touch
                </h3>
                <motion.div
                  className="space-y-4"
                  variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                >
                  <motion.div className="flex items-center space-x-4" variants={fadeIn} custom={0}>
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </motion.div>
                    <div>
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Email
                      </h4>
                      <a
                        href={mailHref}
                        className="text-zinc-800 hover:text-primary-500 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center space-x-4" variants={fadeIn} custom={0}>
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Phone className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </motion.div>
                    <div>
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Phone
                      </h4>
                      <a
                        href={telHref}
                        className="text-zinc-800 hover:text-primary-500 transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center space-x-4" variants={fadeIn} custom={0}>
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="w-5 h-5 text-white" strokeWidth={1.75} />
                    </motion.div>
                    <div>
                      <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Location
                      </h4>
                      <div className="text-zinc-800">
                        <p className="whitespace-pre-line">{address}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="flex flex-col min-h-0 lg:h-full" variants={fadeInUp} custom={2}>
              <div className="flex flex-1 min-h-0 flex-col rounded-2xl border border-zinc-200 bg-white/80 p-8 backdrop-blur-sm md:p-10">
                <h3 className="mb-4 text-lg font-semibold uppercase tracking-tight text-zinc-900 md:text-xl">
                  Connect With Me
                </h3>
                <p className="mb-6 text-sm font-light leading-relaxed text-zinc-800 md:text-base">
                  Find me on LinkedIn to connect about roles, projects, or design work.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href={linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 transition-all duration-300 hover:scale-110 hover:bg-primary-600"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="w-6 h-6 text-white shrink-0" aria-hidden />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
