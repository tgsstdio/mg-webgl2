/// <reference path="GLQueueClearBufferMask.ts" />
/// <reference path="GLCmdClearValuesParameter.ts" />

namespace Magnesium {
  export class WGLCmdBeginRenderpassRecord {
    bitmask: GLQueueClearBufferMask;
    clearState: GLCmdClearValuesParameter;
  }
}