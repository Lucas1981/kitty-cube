/**
 * 3D object: vertex list, rotated list, polygons, with back-face culling and painter's algorithm.
 */

import {
  subVector,
  dotProduct,
  crossProduct,
  crossProductN,
} from "../math/vector.js";
import {
  LOWEST_Z_INDEX,
  HIGHEST_Z_INDEX,
  AVERAGE_Z_INDEX,
} from "../constants.js";
import { Polygon } from "./Polygon.js";

export class Object3D {
  /**
   * @param {object} [data] - Optional parsed JSON mesh data.
   * @param {number[][]} data.vlist - Vertex list.
   * @param {{ vert: number[], color: number[] }[]} data.polygons - Face definitions.
   * @param {number[]} [data.pos] - Initial world position.
   * @param {number[]} [data.rot] - Initial rotation.
   */
  constructor(data) {
    this.state = undefined;
    this.pos = data?.pos ?? [];
    this.rot = data?.rot ?? [];
    this.vlist = data?.vlist ?? [];
    this.rlist = [];
    this.fillFlag = true;
    this.strokeFlag = true;
    this.width = undefined;
    this.height = undefined;
    this.uvWidth = undefined;
    this.uvHeight = undefined;
    this.unitSize = undefined;
    this.uv = undefined;
    this.poly = data?.polygons?.map((p) => {
      const poly = new Polygon();
      poly.vert = p.vert;
      poly.color = p.color;
      return poly;
    }) ?? [];
  }

  backFaceCulling() {
    for (let i = 0; i < this.poly.length; i++) {
      const v0 = this.rlist[this.poly[i].vert[0]];
      const v1 = subVector(
        this.rlist[this.poly[i].vert[1]],
        this.rlist[this.poly[i].vert[0]],
      );
      const v2 = subVector(
        this.rlist[this.poly[i].vert[2]],
        this.rlist[this.poly[i].vert[0]],
      );
      this.poly[i].surfaceNormal = crossProductN(v2, v1);
      const n = crossProduct(v2, v1);
      const dp = dotProduct(v0, n);
      this.poly[i].state = dp < 0;
    }
  }

  paintersAlgorithm(method) {
    for (let i = 0; i < this.poly.length; i++) {
      switch (method) {
        case LOWEST_Z_INDEX:
          this.poly[i].zIndex = this.rlist[this.poly[i].vert[0]][2];
          for (let j = 0; j < this.poly[i].vert.length; j++) {
            if (this.rlist[this.poly[i].vert[j]][2] < this.poly[i].zIndex) {
              this.poly[i].zIndex = this.rlist[this.poly[i].vert[j]][2];
            }
          }
          break;
        case HIGHEST_Z_INDEX:
          this.poly[i].zIndex = this.rlist[this.poly[i].vert[0]][2];
          for (let j = 0; j < this.poly[i].vert.length; j++) {
            if (this.rlist[this.poly[i].vert[j]][2] > this.poly[i].zIndex) {
              this.poly[i].zIndex = this.rlist[this.poly[i].vert[j]][2];
            }
          }
          break;
        case AVERAGE_Z_INDEX:
          this.poly[i].zIndex = 0;
          for (let j = 0; j < this.poly[i].vert.length; j++) {
            this.poly[i].zIndex += this.rlist[this.poly[i].vert[j]][2];
          }
          this.poly[i].zIndex /= this.poly[i].vert.length;
          break;
        default:
          console.warn("paintersAlgorithm: unknown method", method);
      }
    }
    this.poly.sort((a, b) => b.zIndex - a.zIndex);
  }
}
