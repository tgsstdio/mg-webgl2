/// <reference path="GLQueueClearBufferMask.ts" />
/// <reference path="GLCmdClearValuesParameter.ts" />

namespace Magnesium {
  export class GLCmdBeginRenderpassRecord {
    bitmask: GLQueueClearBufferMask;
    clearState: GLCmdClearValuesParameter;
  }
}