import {IMgCommandBuffer} from '../../mg/IMgCommandBuffer';
import {WGLCmdCommandBufferRecord} from './WGLCmdCommandBufferRecord';

export interface IWGLCommandBuffer extends IMgCommandBuffer {
  isQueueReady: boolean;
  resetAllData(): void;
  readonly record: WGLCmdCommandBufferRecord;
}
