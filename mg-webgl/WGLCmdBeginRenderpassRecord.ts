import {WGLQueueClearBufferMask} from './WGLQueueClearBufferMask';
import {WGLCmdClearValuesParameter} from './WGLCmdClearValuesParameter';

export class WGLCmdBeginRenderpassRecord {
  bitmask: WGLQueueClearBufferMask;
  clearState: WGLCmdClearValuesParameter;
}
