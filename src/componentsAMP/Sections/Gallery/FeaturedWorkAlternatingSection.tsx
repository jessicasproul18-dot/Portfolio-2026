'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Alternating featured work rows (image + project copy)
 * BEST FOR: UX / product design portfolio homepages
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Six stacked two-column rows; image left/right alternates each row
 * CONTENT ELEMENTS: Project title, short description, See more CTA, project image, See category buttons
 * CONVERSION ROLE: Showcase selected case studies and invite deeper exploration
 * IDEAL POSITION: After about, before contact
 * NOTES / MODIFIERS: Straightforward split layout; id work for in-page nav; links to /work/[slug]; footer links to graphic design and website development
 */

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { projects } from '@/lib/projects';

export function FeaturedWorkAlternatingSection() {
  return (
    <section
      id="work"
      className="scroll-mt-24 bg-white px-4 py-[6rem] md:px-8 lg:px-12"
      aria-label="Featured work"
    >
      <div className="container mx-auto space-y-24">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-normal uppercase tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Featured work
          </h2>
        </header>

        {projects.map((project, index) => {
          const imageOnRight = index % 2 === 1;

          return (
            <article
              key={project.slug}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
            >
              <div
                className={[
                  'relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100',
                  imageOnRight ? 'md:order-2' : 'md:order-1',
                ].join(' ')}
              >
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                {project.year ? (
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-zinc-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-sm">
                    {project.year}
                  </span>
                ) : null}
              </div>

              <div
                className={[
                  'flex max-w-xl flex-col justify-center space-y-4 md:space-y-5',
                  imageOnRight ? 'md:order-1' : 'md:order-2',
                ].join(' ')}
              >
                <h3 className="text-2xl font-normal tracking-tight text-zinc-900 md:text-3xl lg:text-4xl">
                  {project.title}
                </h3>
                <p className="text-base font-light leading-relaxed text-zinc-800 md:text-lg">
                  {project.summary}
                </p>
                <div>
                  <Button variant="primary" size="sm" asChild>
                    <Link href={`/work/${project.slug}`}>See more</Link>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}

        <div className="flex flex-col items-start gap-6 border-t border-zinc-200 pt-[3rem]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">See</p>
          <nav aria-label="Other work categories">
            <ul className="flex flex-wrap gap-2 md:gap-3">
              <li>
                <Link
                  href="/graphic-design"
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 transition hover:border-primary-400 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Graphic design
                </Link>
              </li>
              <li>
                <Link
                  href="/website-development"
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 transition hover:border-primary-400 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Website development
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
