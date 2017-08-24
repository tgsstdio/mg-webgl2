import { MgOffset2D } from './MgOffset2D'
import { MgExtent2D } from './MgExtent2D'

export class MgRect2D {
  offset : MgOffset2D;
  extent : MgExtent2D;

  constructor() {
    this.offset = new MgOffset2D();
    this.extent = new MgExtent2D();
  }
}
