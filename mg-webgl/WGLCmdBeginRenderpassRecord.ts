/// <reference path="GLQueueClearBufferMask.ts" />
/// <reference path="WGLCmdClearValuesParameter.ts" />

namespace Magnesium {
  export class WGLCmdBeginRenderpassRecord {
    bitmask: GLQueueClearBufferMask;
    clearState: WGLCmdClearValuesParameter;
  }
}