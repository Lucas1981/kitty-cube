/**
 * Kitty Cube – Gouraud shading and texturing on a cat photo cube.
 */

import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants.js";
import { Camera } from "./geometry/index.js";
import {
  drawObject,
  drawObjectGouraud,
  drawObjectGouraudTexture,
} from "./rasterizer/draw.js";
import { init } from "./init.js";

const ROTATION_SPEED = 100; // degrees per second

const sun = [0, 0, 1];
const ambient = 0.1;
const pointLight = [0, 0, 0];

const renderModeInput = () =>
  document.querySelector('input[name="render-mode"]:checked').value;

const canvas = document.getElementById("canvas");
const fpsDisplay = document.getElementById("fps-display");
const context = canvas.getContext("2d", { willReadFrequently: true });

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const contextData = context.createImageData(canvas.width, canvas.height);

const camera = new Camera();
camera.pos = [320, 240, 0];
camera.rot = [0, 0, 0];

function drawScreen(objects, lastTime) {
  const now = Date.now();
  const delta = now - lastTime;

  const step = (ROTATION_SPEED * delta) / 1000;
  objects.rot[0] = (objects.rot[0] + step) % 360;
  objects.rot[1] = (objects.rot[1] + step) % 360;
  objects.rot[2] = (objects.rot[2] + step) % 360;

  contextData.data.fill(0);
  switch (renderModeInput()) {
    case "flat":
      drawObject(objects, camera, sun, contextData);
      break;
    case "gouraud":
      drawObjectGouraud(objects, camera, sun, contextData);
      break;
    default:
      drawObjectGouraudTexture(
        objects,
        camera,
        pointLight,
        ambient,
        contextData,
      );
  }
  context.putImageData(contextData, 0, 0);

  fpsDisplay.textContent = `FPS: ${Math.floor(1000 / (delta || 1))}`;

  requestAnimationFrame(() => drawScreen(objects, now));
}

init()
  .then((objects) => drawScreen(objects, Date.now()))
  .catch((err) => console.error(err));
