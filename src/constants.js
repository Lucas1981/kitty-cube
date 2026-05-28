/**
 * Screen and canvas dimensions for the 3D rasterizer.
 */

export const radToDeg = 180 / Math.PI;
export const degToRad = Math.PI / 180;

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 480;
export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 480;
export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

export const shc = SCREEN_HEIGHT * 0.5;
export const swc = SCREEN_WIDTH * 0.5;
export const swc_h = swc * ASPECT_RATIO;

/** Painter's algorithm z-index methods */
export const LOWEST_Z_INDEX = 0;
export const HIGHEST_Z_INDEX = 1;
export const AVERAGE_Z_INDEX = 2;
