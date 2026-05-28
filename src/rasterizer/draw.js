/**
 * High-level object drawing: transform vertices, sort, rasterize.
 */

import {
  addVector,
  subVector,
  scaleVector,
  vectorLength,
  dotProduct,
  normalizeVector,
} from "../math/vector.js";
import { scaleAndRotate, convert3dto2d } from "../math/transform.js";
import { AVERAGE_Z_INDEX } from "../constants.js";
import { drawGeneralTriangle } from "./triangle.js";
import { drawGeneralTriangleGouraud } from "./triangleGouraud.js";
import { drawGeneralTriangleGouraudTexture } from "./triangleTexture.js";
import { shade } from "./shading.js";

/**
 * Draw object with flat per-polygon shading (one color per poly, shaded by distance to sun).
 */
export function drawObject(object, camera, sun, cxData) {
  for (let j = 0; j < object.vlist.length; j++) {
    let fp = object.vlist[j];
    fp = scaleAndRotate(
      fp[0],
      fp[1],
      fp[2],
      object.rot[0],
      object.rot[1],
      object.rot[2],
      1,
    );
    fp = addVector(fp, object.pos);
    fp = subVector(fp, camera.pos);
    fp = scaleAndRotate(
      fp[0],
      fp[1],
      fp[2],
      camera.rot[0],
      camera.rot[1],
      camera.rot[2],
      1,
    );
    object.rlist[j] = fp;
  }

  object.backFaceCulling();
  object.paintersAlgorithm(AVERAGE_Z_INDEX);

  const dc = [];
  for (let j = 0; j < object.poly.length; j++) {
    if (!object.poly[j].state) continue;

    const centroid = addVector(
      addVector(
        object.rlist[object.poly[j].vert[0]],
        object.rlist[object.poly[j].vert[1]],
      ),
      object.rlist[object.poly[j].vert[2]],
    );
    const distToSun = vectorLength(
      subVector(sun, scaleVector(centroid, 1 / 3)),
    );

    for (let i = 0; i < 3; i++) {
      dc[i] = convert3dto2d(object.rlist[object.poly[j].vert[i]]);
    }
    drawGeneralTriangle(dc, shade(object.poly[j].color, distToSun), cxData);
  }
}

/**
 * Draw object with Gouraud shading (per-vertex lighting).
 */
export function drawObjectGouraud(object, camera, sun, cxData) {
  for (let j = 0; j < object.vlist.length; j++) {
    let fp = object.vlist[j];
    fp = scaleAndRotate(
      fp[0],
      fp[1],
      fp[2],
      object.rot[0],
      object.rot[1],
      object.rot[2],
      1,
    );
    fp = addVector(fp, object.pos);
    fp = subVector(fp, camera.pos);
    fp = scaleAndRotate(
      fp[0],
      fp[1],
      fp[2],
      camera.rot[0],
      camera.rot[1],
      camera.rot[2],
      1,
    );
    object.rlist[j] = fp;
  }

  object.backFaceCulling();
  object.paintersAlgorithm(AVERAGE_Z_INDEX);

  const dc = [];
  for (let j = 0; j < object.poly.length; j++) {
    if (!object.poly[j].state) continue;

    for (let i = 0; i < 3; i++) {
      dc[i] = convert3dto2d(object.rlist[object.poly[j].vert[i]]);
      const sc = shade(
        object.poly[j].color,
        vectorLength(subVector(object.rlist[object.poly[j].vert[i]], sun)),
      );
      dc[i].push(sc[0], sc[1], sc[2]);
    }
    drawGeneralTriangleGouraud(dc, cxData);
  }
}

/**
 * Draw object with Gouraud shading and texture mapping (for catcube).
 * pointLight: 3D point for point light.
 */
export function drawObjectGouraudTexture(
  object,
  camera,
  pointLight,
  ambient,
  cxData,
) {
  for (let j = 0; j < object.vlist.length; j++) {
    let fp = object.vlist[j];
    fp = scaleAndRotate(
      fp[0],
      fp[1],
      fp[2],
      object.rot[0],
      object.rot[1],
      object.rot[2],
      1,
    );
    fp = addVector(fp, object.pos);
    fp = subVector(fp, camera.pos);
    fp = scaleAndRotate(
      fp[0],
      fp[1],
      fp[2],
      camera.rot[0],
      camera.rot[1],
      camera.rot[2],
      1,
    );
    object.rlist[j] = fp;
  }

  object.backFaceCulling();

  const dc = [];
  for (let j = 0; j < object.poly.length; j++) {
    if (!object.poly[j].state) continue;

    for (let i = 0; i < 3; i++) {
      const d = subVector(pointLight, object.rlist[object.poly[j].vert[i]]);
      let point = dotProduct(object.poly[j].surfaceNormal, normalizeVector(d));
      if (point < 0) point = 0;
      const intensity = ambient + point;

      dc[i] = convert3dto2d(object.rlist[object.poly[j].vert[i]]);
      const sc = shade(
        object.poly[j].color,
        vectorLength(
          subVector(object.rlist[object.poly[j].vert[i]], [0, 0, 1]),
        ),
      );
      dc[i].push(intensity);
      dc[i].push(sc[1]);
      dc[i].push(sc[2]);
      dc[i].push(object.poly[j].uv[i][0]);
      dc[i].push(object.poly[j].uv[i][1]);
      dc[i].push(object.rlist[object.poly[j].vert[i]][2]);
    }
    drawGeneralTriangleGouraudTexture(dc, object.poly[j].texture, cxData);
  }
}
