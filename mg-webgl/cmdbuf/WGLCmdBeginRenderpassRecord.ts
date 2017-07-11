import {WGLQueueClearBufferMask} from '../queue/WGLQueueClearBufferMask';
import {WGLCmdClearValuesParameter} from './WGLCmdClearValuesParameter';

export class WGLCmdBeginRenderpassRecord {
  bitmask: WGLQueueClearBufferMask;
  clearState: WGLCmdClearValuesParameter;
}
