import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * The supplied horizontal logo (black on white JPEG), shown unaltered.
 * The source file has wide white margins, so the frame below trims to the
 * artwork plus a small margin; clear space comes from the wrapper padding.
 *
 * - tone="auto": on the light theme the white paper is multiplied away so the
 *   mark sits directly on the off-white canvas; on the dark theme it sits on a
 *   white plate.
 * - tone="plate": always on a white plate (dark sections such as the footer).
 */
const SRC_W = 1600;
const SRC_H = 601;
// Artwork bounding box in the source is x 132–1465, y 136–462; keep ~40px margin.
const CROP = { x: 92, y: 96, w: 1413, h: 406 };

export default function Logo({
  tone = 'auto',
  className,
  priority = false,
  width = 168,
  minWidth,
}: {
  tone?: 'auto' | 'plate';
  className?: string;
  priority?: boolean;
  /** rendered width of the artwork in CSS px (the maximum, if minWidth is set) */
  width?: number;
  /** if set, the width scales with the viewport between minWidth and width */
  minWidth?: number;
}) {
  const cssWidth = minWidth ? `clamp(${minWidth}px, 40vw, ${width}px)` : width;
  return (
    <span
      className={cn(
        'inline-block rounded-md',
        tone === 'plate' ? 'bg-white p-2.5' : 'dark:bg-white dark:p-2',
        className
      )}
    >
      <span
        className="relative block overflow-hidden"
        style={{ width: cssWidth, aspectRatio: `${CROP.w} / ${CROP.h}` }}
      >
        <Image
          src="/brand/logo-horizontal.jpg"
          alt="Vishal Apple Store"
          width={SRC_W}
          height={SRC_H}
          priority={priority}
          sizes={`${Math.round((width * SRC_W) / CROP.w)}px`}
          className={cn('absolute max-w-none', tone === 'auto' && 'mix-blend-multiply dark:mix-blend-normal')}
          style={{
            width: `${(SRC_W / CROP.w) * 100}%`,
            height: 'auto',
            left: `${(-CROP.x / CROP.w) * 100}%`,
            top: `${(-CROP.y / CROP.h) * 100}%`,
          }}
        />
      </span>
    </span>
  );
}
