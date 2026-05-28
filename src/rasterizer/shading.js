/**
 * Vertex shading for lighting (distance-based dimming).
 */

const DEFAULT_SCREEN_SCALE = 640;

/**
 * Shade an RGBA color by distance (e.g. to light).
 * Returns [r, g, b, a] clamped to 0–255.
 */
export function shade(rgba, distance, screenScale = DEFAULT_SCREEN_SCALE) {
  const scale = Math.min((screenScale / distance) * 640, 255) / 255;
  return [
    Math.min(rgba[0] * scale, 255),
    Math.min(rgba[1] * scale, 255),
    Math.min(rgba[2] * scale, 255),
    rgba[3] ?? 255,
  ];
}
