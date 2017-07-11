import {IWGLBuffer} from '../IWGLBuffer';
import {MgIndexType} from '../../mg/MgIndexType';

export class WGLCmdIndexBufferParameter {
	indexType: MgIndexType;
	// WARN: offset requires ulong
	offset: number;
	// WARN: buffer requires IGLBuffer
	buffer: IWGLBuffer|null;
}

