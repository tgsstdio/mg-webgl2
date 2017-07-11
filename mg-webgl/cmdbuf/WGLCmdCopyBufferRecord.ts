import {WGLCmdCopyBufferRegionRecord}
	from './WGLCmdCopyBufferRegionRecord';	
import {IWGLBuffer}
	from '../IWGLBuffer';	

export class WGLCmdCopyBufferRecord {
  source: IWGLBuffer;
  destination: IWGLBuffer;
  regions: Array<WGLCmdCopyBufferRegionRecord>;
}