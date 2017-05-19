namespace Magnesium { 
  export interface IGLCommandBuffer {
    isQueueReady: boolean;
    resetAllData(): void;
    record: WGLCmdCommandBufferRecord;
  }
}