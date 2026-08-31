'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Featured work gallery with category filters
 * BEST FOR: Portfolio homepages that showcase web design projects
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Centered heading with filter row above a responsive image grid gallery
 * CONTENT ELEMENTS: Section title, description, filter buttons, image gallery with lightbox
 * CONVERSION ROLE: Show selected work and build confidence before contact
 * IDEAL POSITION: After about, before contact or testimonials
 * NOTES / MODIFIERS: Uses shared Gallery UI component, responsive, keyboard-accessible, supports lightbox and pagination; section id work for in-page CTAs
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { SectionHeaderBlock } from '@/components/Blocks/SectionHeaderBlock';
import { Button } from '@/components/UI/Button';
import { Gallery, type GalleryImageInput } from '@/components/UI/Gallery';

const galleryCategories: Array<{ id: number; name: string }> = [
  { id: 1, name: 'Websites' },
  { id: 2, name: 'Landing Pages' },
  { id: 3, name: 'UI Design' },
  { id: 4, name: 'Visual Systems' },
];

const galleryImages: GalleryImageInput[] = [
  {
    id: 1,
    url: '/images/luxury-home.jpg',
    alt_text: 'Custom brand website with clean homepage layout',
    gallery_ids: [1],
  },
  {
    id: 2,
    url: '/images/luxury-property-02.jpg',
    alt_text: 'Marketing landing page with strong visual hierarchy',
    gallery_ids: [2],
  },
  {
    id: 3,
    url: '/images/luxury-interior.jpg',
    alt_text: 'Interface design exploration for a product dashboard',
    gallery_ids: [3],
  },
  {
    id: 4,
    url: '/images/luxury-property-03.jpg',
    alt_text: 'Visual system samples including type and color application',
    gallery_ids: [4],
  },
  {
    id: 5,
    url: '/images/luxury-interior-02.jpg',
    alt_text: 'Multi-page website design with editorial spacing',
    gallery_ids: [1, 3],
  },
  {
    id: 6,
    url: '/images/hero-bg.jpg',
    alt_text: 'Conversion-focused landing page hero composition',
    gallery_ids: [2],
  },
  {
    id: 7,
    url: '/images/luxury-bedroom.jpg',
    alt_text: 'UI detail work showing cards, controls, and layout polish',
    gallery_ids: [1, 3],
  },
  {
    id: 8,
    url: '/images/luxury-property-04.jpg',
    alt_text: 'Brand visual system applied across digital touchpoints',
    gallery_ids: [2, 4],
  },
  {
    id: 9,
    url: '/images/luxury-property.png',
    alt_text: 'Website case study preview with refined photography treatment',
    gallery_ids: [1, 3, 4],
  },
  {
    id: 10,
    url: '/images/placeholder.webp',
    alt_text: 'Landing page module layout for campaign storytelling',
    gallery_ids: [2],
  },
];

export const FourColumnImageFilter: React.FC = () => {
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    galleryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }, [activeFilterId]);

  const filteredImages = useMemo(() => {
    if (activeFilterId === null) return galleryImages;
    return galleryImages.filter((image) =>
      image.gallery_ids?.includes(activeFilterId),
    );
  }, [activeFilterId]);

  const hasImages = filteredImages.length > 0;

  return (
    <section
      id="work"
      className="scroll-mt-24 bg-white py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12"
      aria-label="Featured work"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-stretch">
        <SectionHeaderBlock
          eyebrow="Featured Work"
          title="Selected projects shaped with clarity and craft."
          description="A placeholder gallery of websites, landing pages, UI design, and visual systems. Filter by collection to explore the kind of digital work this portfolio is built to showcase."
        />

        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          role="tablist"
          aria-label="Filter featured work by collection"
        >
          <Button
            variant={activeFilterId === null ? 'primary' : 'primaryOutline'}
            size="sm"
            onClick={() => setActiveFilterId(null)}
          >
            All work
          </Button>
          {galleryCategories.map((category) => (
            <Button
              key={category.id}
              variant={
                activeFilterId === category.id ? 'primary' : 'primaryOutline'
              }
              size="sm"
              onClick={() => setActiveFilterId(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div ref={galleryRef}>
          {hasImages ? (
            <Gallery
              key={activeFilterId ?? 'all'}
              images={filteredImages}
              columns={4}
              itemsPerPage={8}
            />
          ) : (
            <p className="py-12 text-center text-sm text-zinc-500 md:text-base">
              There are no projects to display in this collection yet. Please
              check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
