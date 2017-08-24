import {MgRect2D}
	from './MgRect2D';

export class MgClearRect {
  rect: MgRect2D;
  baseArrayLayer: number;
  layerCount: number;

  /**
   *
   */
  constructor() {
    this.rect = new MgRect2D();
    this.baseArrayLayer = 0;
    this.layerCount = 0;
  }
}
