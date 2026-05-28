/**
 * Texture-mapped grid mesh (for terrain / image quads).
 */

import { Object3D } from '../geometry/Object3D.js';
import { Polygon } from '../geometry/Polygon.js';

/**
 * Create a grid with per-vertex color sampled from an image (ImageData).
 * @param {number} gridWidth
 * @param {number} gridHeight
 * @param {number} amplitude - Spacing between vertices
 * @param {ImageData} image - RGBA image for texture
 */
export function createTextureMap(gridWidth, gridHeight, amplitude, image) {
  const object = new Object3D();
  let polygonCounter = 0;

  object.poly = [];
  object.width = gridWidth * amplitude;
  object.height = gridHeight * amplitude;
  object.uvWidth = image.width;
  object.uvHeight = image.height;
  object.unitSize = amplitude;

  for (let j = 0; j < gridHeight; j++) {
    for (let i = 0; i < gridWidth; i++) {
      object.vlist[j * gridWidth + i] = [
        amplitude * j,
        0,
        amplitude * i,
      ];
    }
  }

  for (let j = 0; j < gridHeight; j++) {
    for (let i = 0; i < gridWidth; i++) {
      if (j > 0 && i > 0) {
        const v0 = (j * gridWidth + i) - gridWidth - 1;
        const v1 = (j * gridWidth + i) - gridWidth;
        const v2 = (j * gridWidth + i);

        const poly1 = new Polygon();
        poly1.vert = [v0, v2, v1];
        const uv1 = [
          Math.floor(
            (image.width / object.width) * object.vlist[v0][0]
          ),
          Math.floor(
            (image.height / object.height) * object.vlist[v0][2]
          ),
        ];
        const base1 = (uv1[1] * image.width + uv1[0]) * 4;
        poly1.color = [
          image.data[base1],
          image.data[base1 + 1],
          image.data[base1 + 2],
          image.data[base1 + 3],
        ];
        object.poly.push(poly1);
        polygonCounter++;

        const poly2 = new Polygon();
        poly2.vert = [v0, (j * gridWidth + i) - 1, v2];
        const uv2 = [
          Math.floor(
            (image.width / object.width) * object.vlist[v0][0]
          ),
          Math.floor(
            (image.height / object.height) * object.vlist[v0][2]
          ),
        ];
        const base2 = (uv2[1] * image.width + uv2[0]) * 4;
        poly2.color = [
          image.data[base2],
          image.data[base2 + 1],
          image.data[base2 + 2],
          image.data[base2 + 3],
        ];
        object.poly.push(poly2);
        polygonCounter++;
      }
    }
  }

  return object;
}
