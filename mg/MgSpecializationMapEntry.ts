/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgSpecializationMapEntry	{
    constantID : number;
    offset : number;
    // WARN: size requires UInt64 / UIntPtr
    size : number;
	}
}