# Catcube – 3D rasterizer

Gouraud shading and texturing on a cat photo cube. Refactored into a Vite project with a modular 3D rasterizer library.

## Setup

```bash
npm install
```

## Scripts

- **`npm run build`** – Build for production (output in `dist/`)
- **`npm run serve`** – Serve the production build (run after `npm run build`)
- **`npm run dev`** – Start the Vite dev server with hot reload

## Project structure

- **`index.html`** – Entry HTML (canvas + app)
- **`src/`**
  - **`main.js`** – Catcube app (canvas, objects, textures, draw loop)
  - **`constants.js`** – Screen/canvas size, aspect ratio, z-index enums
  - **`math/`** – Trig lookup, vector math, 3D→2D projection and rotation
  - **`geometry/`** – Polygon, Camera, Object3D (back-face culling, painter’s algorithm)
  - **`rasterizer/`** – Flat/Gouraud/textured triangle rasterization, shading, drawObject*
  - **`color/`** – rgbToHsl
  - **`shapes/`** – createCube, createTextureMap
- **`public/images/`** – Cat textures (served at `/images/`)

The original `js/3dlibrary.js` is split into these modules; the old `catcube.html` and `js/` folder are left in place for reference.
