'use client';

/**
 * **CURSOR INFO**
 * SECTION TYPE: Graphic design project gallery with multi-image lightbox
 * BEST FOR: Portfolio graphic design pages
 * VISUAL STYLE: Modern, minimal, and clean
 * LAYOUT: Responsive project grid; lightbox slideshow with thumbnail strip
 * CONTENT ELEMENTS: Project cards with labels, fullscreen slideshow, upcoming image thumbs
 * CONVERSION ROLE: Showcase visual design work by project
 * IDEAL POSITION: Main content under page header on graphic design page
 * NOTES / MODIFIERS: Groups multiple images per project; cover is first image
 */

import { useCallback, useEffect, useId, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { graphicDesignProjects, type GraphicDesignProject } from '@/lib/graphicDesign';

export function GraphicDesignGallerySection() {
  const [activeProject, setActiveProject] = useState<GraphicDesignProject | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const titleId = useId();

  const handleOpen = (project: GraphicDesignProject) => {
    setActiveProject(project);
    setSlideIndex(0);
  };

  const handleClose = useCallback(() => {
    setActiveProject(null);
    setSlideIndex(0);
  }, []);

  const handlePrev = useCallback(() => {
    if (!activeProject) return;
    setSlideIndex((index) =>
      index <= 0 ? activeProject.images.length - 1 : index - 1,
    );
  }, [activeProject]);

  const handleNext = useCallback(() => {
    if (!activeProject) return;
    setSlideIndex((index) =>
      index >= activeProject.images.length - 1 ? 0 : index + 1,
    );
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'ArrowLeft') handlePrev();
      if (event.key === 'ArrowRight') handleNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, handleClose, handlePrev, handleNext]);

  const currentImage = activeProject?.images[slideIndex];
  const hasMultiple = (activeProject?.images.length ?? 0) > 1;

  return (
    <>
      <section
        className="bg-white py-[6rem] px-4 md:px-8 lg:px-12"
        aria-label="Graphic design gallery"
      >
        <div className="container mx-auto max-w-6xl">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
            {graphicDesignProjects.map((project) => {
              const cover = project.images[0];
              if (!cover) return null;

              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => handleOpen(project)}
                    className="group w-full space-y-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label={`View ${project.title}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                      {project.images.length > 1 ? (
                        <span className="absolute bottom-3 right-3 rounded-full bg-zinc-950/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                          {project.images.length} images
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-800">
                      {project.title}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {activeProject && currentImage ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-zinc-950/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={handleClose}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                id={titleId}
                className="text-sm font-semibold uppercase tracking-[0.16em] text-white"
              >
                {activeProject.title}
              </p>
              {hasMultiple ? (
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/60">
                  {slideIndex + 1} of {activeProject.images.length}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close gallery"
            >
              <X className="size-3.5 shrink-0" aria-hidden />
              Close
            </button>
          </div>

          <div
            className="relative mt-4 flex min-h-0 flex-1 items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            {hasMultiple ? (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-0 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-2"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </button>
            ) : null}

            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="100vw"
                className="object-contain object-center"
                priority
              />
            </div>

            {hasMultiple ? (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-0 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-2"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" aria-hidden />
              </button>
            ) : null}
          </div>

          {hasMultiple ? (
            <div
              className="mt-4 shrink-0"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                Upcoming
              </p>
              <ul className="flex gap-2 overflow-x-auto pb-1 md:gap-3">
                {activeProject.images.map((image, index) => {
                  const isActive = index === slideIndex;
                  return (
                    <li key={`${image.src}-${index}`} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setSlideIndex(index)}
                        className={[
                          'relative block h-16 w-24 overflow-hidden rounded-lg border transition md:h-20 md:w-28',
                          isActive
                            ? 'border-white ring-2 ring-white'
                            : 'border-white/20 opacity-70 hover:opacity-100',
                        ].join(' ')}
                        aria-label={`Show image ${index + 1}`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
