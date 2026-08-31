'use client';

import { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import type { ProjectVideo } from '@/lib/projects';

type CaseStudyVideoProps = {
  video: ProjectVideo;
};

export function CaseStudyVideo({ video }: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frameRef.current;
    const player = videoRef.current;
    if (!node || !player) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          const playPromise = player.play();
          if (playPromise) {
            playPromise.catch(() => {
              // Autoplay can still be blocked; controls remain available.
            });
          }
          return;
        }

        player.pause();
      },
      {
        threshold: [0, 0.55, 0.8],
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleRestart = () => {
    const player = videoRef.current;
    if (!player) return;

    player.currentTime = 0;
    const playPromise = player.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Play may still be blocked; user can use native controls.
      });
    }
  };

  return (
    <figure className="space-y-3">
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          controls
          playsInline
          muted
          loop
          preload="metadata"
          poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          type="button"
          onClick={handleRestart}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-zinc-950/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          aria-label="Restart video from the beginning"
        >
          <RotateCcw className="size-3.5 shrink-0" aria-hidden="true" />
          Restart
        </button>
      </div>
      {video.caption ? (
        <figcaption className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
          {video.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
