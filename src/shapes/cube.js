/**
 * Cube mesh generator for the 3D rasterizer.
 */

import { Object3D } from '../geometry/Object3D.js';
import { Polygon } from '../geometry/Polygon.js';

const randomRgba = () => [
  Math.floor(Math.random() * 256),
  Math.floor(Math.random() * 256),
  Math.floor(Math.random() * 256),
  255,
];

/**
 * Create a cube with a single color (or "random" per face).
 * @param {number} size - Half-extent (cube from -size/2 to +size/2)
 * @param {[number,number,number,number]|'random'} color - RGBA or 'random'
 */
export function createCube(size, color) {
  const object = new Object3D();
  const halfSize = size / 2;

  object.poly = [];
  object.vlist = [
    [-halfSize, -halfSize, -halfSize],
    [halfSize, -halfSize, -halfSize],
    [halfSize, halfSize, -halfSize],
    [-halfSize, halfSize, -halfSize],
    [-halfSize, -halfSize, halfSize],
    [halfSize, -halfSize, halfSize],
    [halfSize, halfSize, halfSize],
    [-halfSize, halfSize, halfSize],
  ];

  const verts = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 3, 7, 4],
    [0, 1, 5, 4],
    [1, 2, 6, 5],
    [3, 2, 6, 7],
  ];

  for (let i = 0; i < 6; i++) {
    const poly = new Polygon();
    poly.vert = verts[i];
    poly.color = color === 'random' ? randomRgba() : color;
    object.poly.push(poly);
  }

  return object;
}
