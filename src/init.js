/**
 * Application bootstrap: loads the cube mesh and cat textures,
 * returning a fully initialised Object3D ready for rendering.
 */

import { Object3D } from './geometry/index.js';

const TOTAL_IMAGES = 6;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export async function init() {
  const cubeData = await fetch('/assets/textured-cube.json').then((r) => r.json());
  const objects = new Object3D(cubeData);

  console.log('Loading textures…');
  const images = await Promise.all(
    Array.from({ length: TOTAL_IMAGES }, (_, i) => loadImage(`/images/cats${i + 1}.jpg`))
  );
  console.log(`${TOTAL_IMAGES} textures loaded.`);

  const offScreenCanvas = document.createElement('canvas');
  const offScreenContext = offScreenCanvas.getContext('2d', { willReadFrequently: true });

  for (let i = 0; i < TOTAL_IMAGES; i++) {
    const { width, height } = images[i];
    offScreenCanvas.width = width;
    offScreenCanvas.height = height;
    offScreenContext.drawImage(images[i], 0, 0);
    const textureData = offScreenContext.getImageData(0, 0, width, height);
    objects.poly[i * 2].texture = textureData;
    objects.poly[i * 2 + 1].texture = textureData;
  }

  const tw = images[0].width - 1;
  const th = images[0].height - 1;
  objects.uv = [
    [[0, 0], [tw, 0], [tw, th]],
    [[0, 0], [tw, th], [0, th]],
  ];

  return objects;
}
