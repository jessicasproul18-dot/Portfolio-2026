'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import Image from 'next/image';
import { Expand, X } from 'lucide-react';

type CaseStudyZoomImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  preserveAspect: boolean;
  sizes: string;
  frameClassName?: string;
  clipLeft?: boolean;
  /** Background behind the image in the frame (e.g. cover letterboxing). */
  frameBackgroundClassName?: string;
  /** Use fill layout inside a fixed-aspect frame instead of intrinsic height. */
  fillFrame?: boolean;
  objectFitClassName?: string;
  /** CSS aspect-ratio value, e.g. "1024 / 599". */
  aspectRatio?: string;
  /** When false, renders a static image with no fullscreen lightbox. Defaults to true. */
  allowZoom?: boolean;
};

export function CaseStudyZoomImage({
  src,
  alt,
  priority = false,
  preserveAspect,
  sizes,
  frameClassName = '',
  clipLeft = false,
  frameBackgroundClassName = 'bg-zinc-100',
  fillFrame = false,
  objectFitClassName = 'object-cover object-center',
  aspectRatio,
  allowZoom = true,
}: CaseStudyZoomImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = () => {
    if (!allowZoom) return;
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const frameClasses = [
    'group relative w-full overflow-hidden rounded-2xl',
    frameBackgroundClassName,
    fillFrame || !preserveAspect
      ? frameClassName || (aspectRatio ? '' : 'aspect-[4/3]')
      : frameClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const image =
    preserveAspect && !fillFrame ? (
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        priority={priority}
        sizes={sizes}
        className={[
          'h-auto w-full',
          allowZoom ? 'transition duration-300 group-hover:scale-[1.01]' : '',
          clipLeft
            ? allowZoom
              ? 'max-w-none scale-[1.02] origin-right group-hover:scale-[1.03]'
              : 'max-w-none scale-[1.02] origin-right'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ) : (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={[
          objectFitClassName,
          allowZoom ? 'transition duration-300 group-hover:scale-[1.01]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );

  if (!allowZoom) {
    return (
      <div style={aspectRatio ? { aspectRatio } : undefined} className={frameClasses}>
        {image}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        style={aspectRatio ? { aspectRatio } : undefined}
        className={[
          frameClasses,
          'cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        ].join(' ')}
        aria-label={`View larger: ${alt}`}
      >
        {image}

        <span
          className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-zinc-950/75 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        >
          <Expand className="size-3.5 shrink-0" />
          Full screen
        </span>
        <span
          className="pointer-events-none absolute inset-0 bg-zinc-950/0 transition group-hover:bg-zinc-950/10 group-focus-visible:bg-zinc-950/10"
          aria-hidden
        />
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={handleClose}
        >
          <p id={titleId} className="sr-only">
            {alt}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-[101] inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8 md:top-8"
            aria-label="Close full screen image"
          >
            <X className="size-3.5 shrink-0" aria-hidden />
            Close
          </button>
          <div
            className="relative h-full w-full max-w-[1400px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
