/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgDescriptorBufferInfo	{
    buffer : IMgBuffer;
    // WARN: offset requires UInt64 
    offset : number;
    // WARN: range requires UInt64 
    range : number;
	}
}