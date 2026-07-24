/**
 * Build-time sketchy SVG helpers (roughjs runs headless in Node — verified).
 * Everything here executes in .astro frontmatter at build; nothing ships to the client.
 * Fixed seeds keep builds reproducible ("the same page of the sketchbook").
 */
import rough from 'roughjs';

const BASE = { roughness: 1.8, bowing: 1.2, strokeWidth: 1.5 };

function generator(seed: number) {
  return rough.generator({ options: { ...BASE, seed } });
}

/** Wobbly rectangle path(s), inset so strokes stay inside the viewBox. */
export function sketchRect(w: number, h: number, seed = 7, inset = 4): string[] {
  const g = generator(seed);
  const drawable = g.rectangle(inset, inset, w - inset * 2, h - inset * 2);
  return g.toPaths(drawable).map((p) => p.d);
}

/** Wobbly line path(s). */
export function sketchLine(x1: number, y1: number, x2: number, y2: number, seed = 7): string[] {
  const g = generator(seed);
  return g.toPaths(g.line(x1, y1, x2, y2)).map((p) => p.d);
}

/** Gentle squiggle arrow (curve + head) used by sketch notes. */
export function sketchArrow(len = 40, seed = 7): string[] {
  const g = generator(seed);
  const paths: string[] = [];
  const curve = g.curve([
    [2, 6],
    [len * 0.35, 0],
    [len * 0.65, 12],
    [len - 2, 6],
  ]);
  paths.push(...g.toPaths(curve).map((p) => p.d));
  paths.push(...g.toPaths(g.line(len - 10, 1, len - 2, 6)).map((p) => p.d));
  paths.push(...g.toPaths(g.line(len - 10, 12, len - 2, 6)).map((p) => p.d));
  return paths;
}

/** Tooltip-border width buckets: pre-rendered at build, picked at runtime. */
export const TIP_BUCKETS = [140, 180, 220, 260, 300, 340, 380, 420, 460];
export const TIP_HEIGHT = 64;

export function tipBucketPaths(): { w: number; paths: string[] }[] {
  // seed varies per bucket so each box wobbles differently, deterministically
  return TIP_BUCKETS.map((w, i) => ({ w, paths: sketchRect(w, TIP_HEIGHT, 11 + i * 3) }));
}
