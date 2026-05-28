/**
 * 3D rasterizer library – single entry point.
 * Gouraud shading, texturing, painter's algorithm, back-face culling.
 */

export * from './constants.js';
export * from './math/index.js';
export { Polygon, Camera, Object3D } from './geometry/index.js';
export * from './rasterizer/index.js';
export * from './color/index.js';
export * from './shapes/index.js';
