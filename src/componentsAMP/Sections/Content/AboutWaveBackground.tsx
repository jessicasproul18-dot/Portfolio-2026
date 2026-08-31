'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

type AboutWaveBackgroundProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduceMotion: boolean;
  /**
   * Optional crest positions as 0–1 of container height (0 = top).
   * When set, one wave is drawn per anchor so bands can line up with page sections.
   */
  waveAnchors?: number[];
  /** When true, only render cursor-reactive ambient dots (no wave canvas). */
  dotsOnly?: boolean;
};

const DEFAULT_WAVE_COUNT = 4;

/** Soft primary blue (~#2b3990) and mauve (~#d8d2d7) washes */
const WAVE_COLORS = [
  'rgba(43, 57, 144, 0.10)',
  'rgba(216, 210, 215, 0.22)',
  'rgba(43, 57, 144, 0.08)',
  'rgba(216, 210, 215, 0.18)',
] as const;

type AmbientDot = {
  id: number;
  x: number;
  y: number;
  size: number;
  depth: number;
  tone: 'primary' | 'wisteria' | 'porcelain';
};

const AMBIENT_DOTS: AmbientDot[] = [
  { id: 0, x: 8, y: 18, size: 3, depth: 0.45, tone: 'wisteria' },
  { id: 1, x: 18, y: 42, size: 2, depth: 0.7, tone: 'primary' },
  { id: 2, x: 28, y: 12, size: 4, depth: 0.35, tone: 'porcelain' },
  { id: 3, x: 38, y: 68, size: 2.5, depth: 0.85, tone: 'wisteria' },
  { id: 4, x: 48, y: 28, size: 3, depth: 0.55, tone: 'primary' },
  { id: 5, x: 58, y: 78, size: 2, depth: 0.75, tone: 'porcelain' },
  { id: 6, x: 68, y: 22, size: 3.5, depth: 0.4, tone: 'wisteria' },
  { id: 7, x: 76, y: 52, size: 2, depth: 0.95, tone: 'primary' },
  { id: 8, x: 86, y: 36, size: 4, depth: 0.6, tone: 'porcelain' },
  { id: 9, x: 12, y: 72, size: 2.5, depth: 0.65, tone: 'wisteria' },
  { id: 10, x: 92, y: 70, size: 3, depth: 0.5, tone: 'primary' },
  { id: 11, x: 42, y: 48, size: 2, depth: 0.8, tone: 'porcelain' },
  { id: 12, x: 62, y: 14, size: 2.5, depth: 0.7, tone: 'wisteria' },
  { id: 13, x: 22, y: 58, size: 3, depth: 0.55, tone: 'primary' },
  { id: 14, x: 82, y: 16, size: 2, depth: 0.9, tone: 'porcelain' },
  { id: 15, x: 5, y: 48, size: 2.5, depth: 0.6, tone: 'wisteria' },
  { id: 16, x: 33, y: 34, size: 3, depth: 0.5, tone: 'primary' },
  { id: 17, x: 52, y: 62, size: 2, depth: 0.85, tone: 'porcelain' },
  { id: 18, x: 71, y: 40, size: 3.5, depth: 0.45, tone: 'wisteria' },
  { id: 19, x: 15, y: 28, size: 2, depth: 0.75, tone: 'primary' },
  { id: 20, x: 88, y: 58, size: 2.5, depth: 0.55, tone: 'porcelain' },
  { id: 21, x: 45, y: 82, size: 3, depth: 0.65, tone: 'wisteria' },
  { id: 22, x: 95, y: 24, size: 2, depth: 0.8, tone: 'primary' },
  { id: 23, x: 25, y: 84, size: 2.5, depth: 0.5, tone: 'porcelain' },
];

const dotToneClass = (tone: AmbientDot['tone']) => {
  if (tone === 'primary') return 'bg-primary-600/55';
  if (tone === 'wisteria') return 'bg-wisteria-600/55';
  return 'bg-porcelain-400/60';
};

type FloatingDotProps = {
  dot: AmbientDot;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduceMotion: boolean;
};

const FloatingDot = ({
  dot,
  mouseX,
  mouseY,
  reduceMotion,
}: FloatingDotProps) => {
  const offsetX = useTransform(mouseX, (v) =>
    reduceMotion ? 0 : (v - 0.5) * 32 * dot.depth,
  );
  const offsetY = useTransform(mouseY, (v) =>
    reduceMotion ? 0 : (v - 0.5) * 26 * dot.depth,
  );

  return (
    <motion.span
      className={['absolute rounded-full', dotToneClass(dot.tone)].join(' ')}
      style={{
        left: `${dot.x}%`,
        top: `${dot.y}%`,
        width: dot.size,
        height: dot.size,
        x: offsetX,
        y: offsetY,
      }}
      aria-hidden="true"
    />
  );
};

/**
 * Soft cursor-reactive wave field plus ambient dots for hero / contact / about.
 * Pass dotsOnly for compact bands (e.g. subpage titles) that only need the dots.
 */
export function AboutWaveBackground({
  mouseX,
  mouseY,
  reduceMotion,
  waveAnchors,
  dotsOnly = false,
}: AboutWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorsRef = useRef(waveAnchors);
  anchorsRef.current = waveAnchors;

  useEffect(() => {
    if (dotsOnly) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resolveBaseYs = () => {
      const anchors = anchorsRef.current;
      if (anchors && anchors.length > 0) {
        return anchors.map((a) => height * Math.min(0.92, Math.max(0.04, a)));
      }
      return Array.from({ length: DEFAULT_WAVE_COUNT }, (_, i) =>
        height * (0.22 + i * 0.18),
      );
    };

    const paint = (mx: number, my: number, phaseBase: number) => {
      ctx.clearRect(0, 0, width, height);
      const baseYs = resolveBaseYs();

      for (let i = 0; i < baseYs.length; i += 1) {
        const baseY = baseYs[i] ?? height * 0.5;
        const amp = reduceMotion ? 10 + i * 4 : 14 + i * 6 + my * 18;
        const freq = reduceMotion
          ? 0.003 + i * 0.0006
          : 0.0032 + i * 0.0007 + mx * 0.0012;
        const phase = reduceMotion
          ? i * 1.2
          : phaseBase * (0.55 + i * 0.12) + mx * Math.PI * 2 + i * 1.35;

        drawWave(
          ctx,
          width,
          height,
          baseY,
          amp,
          freq,
          phase,
          mx,
          my,
          WAVE_COLORS[i % WAVE_COLORS.length] ?? WAVE_COLORS[0],
          !reduceMotion,
        );
      }
    };

    const draw = () => {
      time += 0.008;
      paint(mouseX.get(), mouseY.get(), time);
      rafId = window.requestAnimationFrame(draw);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    if (reduceMotion) {
      paint(0.5, 0.5, 0);
      return () => {
        observer.disconnect();
      };
    }

    rafId = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, reduceMotion, dotsOnly]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {dotsOnly ? null : <canvas ref={canvasRef} className="h-full w-full" />}
      {AMBIENT_DOTS.map((dot) => (
        <FloatingDot
          key={dot.id}
          dot={dot}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

const drawWave = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  baseY: number,
  amp: number,
  freq: number,
  phase: number,
  mx: number,
  my: number,
  fill: string,
  interactive: boolean,
) => {
  const cursorX = mx * width;
  const cursorY = my * height;

  ctx.beginPath();
  ctx.moveTo(0, height);

  for (let x = 0; x <= width; x += 4) {
    const distX = (x - cursorX) / Math.max(width, 1);
    const pull = interactive
      ? Math.exp(-distX * distX * 3.2) * (amp * 0.55)
      : 0;
    const y =
      baseY +
      Math.sin(x * freq + phase) * amp +
      Math.sin(x * freq * 1.7 + phase * 0.8) * (amp * 0.35) +
      (interactive
        ? pull * Math.sin((x - cursorX) * 0.012 + phase) +
          (cursorY - baseY) * 0.04 * Math.exp(-distX * distX * 2.4)
        : 0);

    if (x === 0) {
      ctx.lineTo(0, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
};
