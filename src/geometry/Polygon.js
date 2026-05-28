/**
 * A single polygon (triangle or quad) with vertices, colors, and optional texture.
 */

export class Polygon {
  constructor() {
    this.state = undefined;
    this.vlist = undefined;
    this.vert = [];
    this.color = undefined;
    this.fillColor = undefined;
    this.strokeColor = undefined;
    this.surfaceNormal = undefined;
    this.texture = undefined;
    this.zIndex = undefined;
  }
}
