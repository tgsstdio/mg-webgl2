namespace Magnesium { 
  export interface IWGLCommandBuffer extends IMgCommandBuffer {
    isQueueReady: boolean;
    resetAllData(): void;
    readonly record: WGLCmdCommandBufferRecord;
  }
}