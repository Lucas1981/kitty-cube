/**
 * 3D→2D projection and rotation/scale transforms.
 */

import { swc, shc, swc_h } from '../constants.js';
import { sine, cosine } from './trig.js';

/**
 * Perspective project a 3D point to 2D screen coordinates.
 * Uses 45° FOV-style scaling (swc = half screen width as scale).
 */
export function convert3dto2d(vp) {
  const x1 = (swc * vp[0]) / vp[2];
  const y1 = (swc_h * vp[1]) / vp[2];
  return [Math.floor(x1 + swc), Math.floor(y1 + shc)];
}

/**
 * Apply Euler rotation (ax, ay, az in degrees, lookup indices) and scale to a point.
 */
export function scaleAndRotate(ox, oy, oz, ax, ay, az, scale) {
  let x = ox;
  let y = oy;
  let z = oz;

  const cosz = cosine[Math.floor(az)];
  const sinz = sine[Math.floor(az)];
  const cosy = cosine[Math.floor(ay)];
  const siny = sine[Math.floor(ay)];
  const cosx = cosine[Math.floor(ax)];
  const sinx = sine[Math.floor(ax)];

  // Z
  let ny = y * cosz + x * sinz;
  x = x * cosz - y * sinz;
  y = ny;

  // Y
  let nx = x * cosy - z * siny;
  z = z * cosy + x * siny;
  x = nx;

  // X
  ny = y * cosx - z * sinx;
  z = z * cosx + y * sinx;
  y = ny;

  return [x * scale, y * scale, z * scale];
}
