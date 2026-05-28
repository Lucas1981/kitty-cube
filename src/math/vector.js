/**
 * 3D vector math for the rasterizer.
 */

export function vectorLength(v) {
  return Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
}

export function addVector(v1, v2) {
  return v1.map((x, i) => x + v2[i]);
}

export function subVector(v1, v2) {
  return v1.map((x, i) => x - v2[i]);
}

export function dotProduct(v1, v2) {
  return v1.reduce((dp, x, i) => dp + x * v2[i], 0);
}

export function scaleVector(v, factor) {
  return v.map((x) => x * factor);
}

export function projectionVector(v1, v2) {
  const dp = dotProduct(v1, v2);
  const len2 = v2.reduce((s, x) => s + x * x, 0);
  return scaleVector(v2, dp / len2);
}

export function angleBetweenVectors(v1, v2) {
  const dp = dotProduct(v1, v2);
  const l1 = vectorLength(v1);
  const l2 = vectorLength(v2);
  return Math.acos(dp / (l1 * l2));
}

export function normalizeVector(v) {
  const totalLength = vectorLength(v);
  if (totalLength === 0) return v;
  return v.map((x) => x / totalLength);
}

/** Cross product, normalized (unit vector). */
export function crossProductN(v1, v2) {
  const n = [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0],
  ];
  return normalizeVector(n);
}

/** Cross product (full magnitude). */
export function crossProduct(v1, v2) {
  const n = crossProductN(v1, v2);
  const a = angleBetweenVectors(v1, v2);
  const l1 = vectorLength(v1);
  const l2 = vectorLength(v2);
  return scaleVector(n, l1 * l2 * Math.sin(a));
}
