import {WGLBufferRangeTarget} from './WGLBufferRangeTarget'

export class WGLDynamicOffsetInfo {
	target: WGLBufferRangeTarget;
	dstIndex: number;

	equals(other: WGLDynamicOffsetInfo) : boolean
	{
		if (this.target != other.target)
			return false;

		return this.dstIndex == other.dstIndex;
	}    
}
