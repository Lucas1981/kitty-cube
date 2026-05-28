# Kitty cube – 3D rasterizer

Hosted: https://zzp-online-marketing.nl/kitty-cube/

Gouraud shading and texturing on a cat photo cube. Refactored into a Vite project with a modular 3D rasterizer library. I wrote the original back in 2016 for this, but like some other repositories I was working on it was working but a hot mess. I decided to take it and work on it using Cursor with AI agents to make it comply with modern standards of web dev projects. It's much more structured and organized now, which is nice.

I like that this has a complete shader and gouraud functionality in there, even with a bit of lighting. I'd want to also iterate on this to improve performance, where initially I just created it as a proof of concept to see if I could move around a textured object at all. It's a pretty ok 3d renderer, although not matrix based, so probably there already there is some performance mileage to be gained.

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
  - **`rasterizer/`** – Flat/Gouraud/textured triangle rasterization, shading, drawObject\*
  - **`color/`** – rgbToHsl
  - **`shapes/`** – createCube, createTextureMap
- **`public/images/`** – Cat textures (served at `/images/`)

The original `js/3dlibrary.js` is split into these modules; the old `catcube.html` and `js/` folder are left in place for reference.
