export class WGLCmdCopyBufferRegionRecord {
  // WARN: readOffset requires IntPtr
  readOffset: number;
  size: number;
  // WARN: readOffset requires IntPtr  
  writeOffset: number;
}