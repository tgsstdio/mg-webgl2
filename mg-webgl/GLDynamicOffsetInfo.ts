/// <reference path="GLBufferRangeTarget.ts" />

namespace Magnesium {
  export class GLDynamicOffsetInfo {
    target: GLBufferRangeTarget;
    dstIndex: number;

		equals(other: GLDynamicOffsetInfo) : boolean
		{
			if (this.target != other.target)
				return false;

			return this.dstIndex == other.dstIndex;
		}    
  }
}