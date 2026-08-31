'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type LifestyleImage = {
  src: string;
  alt: string;
  caption?: string;
};

type AboutLifestyleCarouselProps = {
  images: LifestyleImage[];
};

const LOOP_COPIES = 3;
const FRICTION = 0.955;
const MIN_VELOCITY = 0.04;
const MAX_VELOCITY = 4.5;

export function AboutLifestyleCarousel({ images }: AboutLifestyleCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const movedRef = useRef(false);
  const setWidthRef = useRef(0);
  const isJumpingRef = useRef(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumFrameRef = useRef(0);
  const dragFrameRef = useRef(0);

  const loopImages = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => images).flat(),
    [images],
  );

  const stopMomentum = useCallback(() => {
    if (momentumFrameRef.current) {
      cancelAnimationFrame(momentumFrameRef.current);
      momentumFrameRef.current = 0;
    }
  }, []);

  const measureSetWidth = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || images.length === 0) return 0;

    const items = scroller.querySelectorAll<HTMLLIElement>('li');
    if (items.length < images.length) return 0;

    const first = items[0];
    const lastInSet = items[images.length - 1];
    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;

    return lastInSet.offsetLeft + lastInSet.offsetWidth - first.offsetLeft + gap;
  }, [images.length]);

  const normalizeLoop = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || isJumpingRef.current) return false;

    const setWidth = setWidthRef.current || measureSetWidth();
    if (setWidth <= 0) return false;
    setWidthRef.current = setWidth;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    if (maxScroll <= 0) return false;

    if (scroller.scrollLeft <= setWidth * 0.15) {
      isJumpingRef.current = true;
      scroller.scrollLeft += setWidth;
      if (isDraggingRef.current) {
        scrollLeftRef.current += setWidth;
      }
      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
      return true;
    }

    if (scroller.scrollLeft >= setWidth * 1.85) {
      isJumpingRef.current = true;
      scroller.scrollLeft -= setWidth;
      if (isDraggingRef.current) {
        scrollLeftRef.current -= setWidth;
      }
      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
      return true;
    }

    return false;
  }, [measureSetWidth]);

  const startMomentum = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    stopMomentum();

    let velocity = velocityRef.current;
    if (Math.abs(velocity) < MIN_VELOCITY) return;

    velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));
    let lastStamp = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(32, now - lastStamp);
      lastStamp = now;

      scroller.scrollLeft += velocity * elapsed;
      normalizeLoop();

      velocity *= FRICTION ** (elapsed / 16.67);
      velocityRef.current = velocity;

      if (Math.abs(velocity) < MIN_VELOCITY) {
        momentumFrameRef.current = 0;
        return;
      }

      momentumFrameRef.current = requestAnimationFrame(tick);
    };

    momentumFrameRef.current = requestAnimationFrame(tick);
  }, [normalizeLoop, stopMomentum]);

  const scrollByAmount = useCallback(
    (direction: -1 | 1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      stopMomentum();

      const firstCard = scroller.querySelector('li');
      const cardWidth = firstCard?.getBoundingClientRect().width ?? scroller.clientWidth * 0.5;
      const styles = window.getComputedStyle(scroller);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '24') || 24;

      scroller.scrollBy({
        left: direction * (cardWidth + gap),
        behavior: 'smooth',
      });
    },
    [stopMomentum],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const centerOnMiddleSet = () => {
      const setWidth = measureSetWidth();
      if (setWidth <= 0) return;
      setWidthRef.current = setWidth;
      scroller.scrollLeft = setWidth;
    };

    centerOnMiddleSet();

    const handleResize = () => {
      stopMomentum();
      centerOnMiddleSet();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureSetWidth, images, stopMomentum]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      if (isDraggingRef.current || momentumFrameRef.current) return;
      normalizeLoop();
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [normalizeLoop]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      stopMomentum();
      isDraggingRef.current = true;
      movedRef.current = false;
      startXRef.current = event.clientX;
      scrollLeftRef.current = scroller.scrollLeft;
      lastXRef.current = event.clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      scroller.setPointerCapture(event.pointerId);
      scroller.classList.add('cursor-grabbing');
      scroller.classList.remove('cursor-grab');
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const now = performance.now();
      const deltaX = event.clientX - startXRef.current;
      if (Math.abs(deltaX) > 3) {
        movedRef.current = true;
      }

      const sampleDelta = event.clientX - lastXRef.current;
      const sampleTime = Math.max(1, now - lastTimeRef.current);
      // Negative because dragging right should scroll left content
      const instantVelocity = -sampleDelta / sampleTime;
      velocityRef.current = velocityRef.current * 0.7 + instantVelocity * 0.3;
      lastXRef.current = event.clientX;
      lastTimeRef.current = now;

      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = requestAnimationFrame(() => {
        scroller.scrollLeft = scrollLeftRef.current - deltaX;
        normalizeLoop();
      });
      event.preventDefault();
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      scroller.releasePointerCapture(event.pointerId);
      scroller.classList.add('cursor-grab');
      scroller.classList.remove('cursor-grabbing');
      normalizeLoop();
      startMomentum();
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (!movedRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      movedRef.current = false;
    };

    scroller.addEventListener('pointerdown', handlePointerDown);
    scroller.addEventListener('pointermove', handlePointerMove);
    scroller.addEventListener('pointerup', handlePointerUp);
    scroller.addEventListener('pointercancel', handlePointerUp);
    scroller.addEventListener('click', handleClickCapture, true);

    return () => {
      stopMomentum();
      cancelAnimationFrame(dragFrameRef.current);
      scroller.removeEventListener('pointerdown', handlePointerDown);
      scroller.removeEventListener('pointermove', handlePointerMove);
      scroller.removeEventListener('pointerup', handlePointerUp);
      scroller.removeEventListener('pointercancel', handlePointerUp);
      scroller.removeEventListener('click', handleClickCapture, true);
    };
  }, [normalizeLoop, startMomentum, stopMomentum]);

  return (
    <div className="relative space-y-4">
      <ul
        ref={scrollerRef}
        className="flex w-full cursor-grab gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden"
        aria-label="Lifestyle photos"
        style={{ touchAction: 'pan-x' }}
      >
        {loopImages.map((image, index) => (
          <li
            key={`${image.src}-${index}`}
            className="w-[85%] shrink-0 select-none sm:w-[55%] md:w-[48%] lg:w-[42%]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 48vw, (min-width: 640px) 55vw, 85vw"
                className="pointer-events-none object-cover"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label="Previous photos"
          className="rounded-none p-2 text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label="Next photos"
          className="rounded-none p-2 text-zinc-600 transition-colors hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
