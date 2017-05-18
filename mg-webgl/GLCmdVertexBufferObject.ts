/// <reference path="IGLCmdVBOEntrypoint.ts" />

namespace Magnesium {
    export class GLCmdVertexBufferObject {
      vbo : number;
		  private mFactory: IGLCmdVBOEntrypoint

      constructor(factory : IGLCmdVBOEntrypoint) {
        this.mFactory = factory;
      }
    }
}