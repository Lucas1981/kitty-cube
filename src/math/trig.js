/**
 * Precomputed sine/cosine lookup tables for fast 3D rotations.
 */

import { degToRad } from '../constants.js';

const TABLE_SIZE = 360 * 4;

export const sine = new Float64Array(TABLE_SIZE);
export const cosine = new Float64Array(TABLE_SIZE);

for (let i = 0; i < TABLE_SIZE; i++) {
  sine[i] = Math.sin(i * degToRad);
  cosine[i] = Math.cos(i * degToRad);
}
