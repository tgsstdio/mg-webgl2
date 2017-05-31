namespace Magnesium {
  export class MgBufferCreateInfo	{
		flags: MgBufferCreateFlagBits;
    // WARN: size requires UInt64
		size: number;
		usage: MgBufferUsageFlagBits
		sharingMode: MgSharingMode;
		queueFamilyIndexCount: number;
		queueFamilyIndices: Array<number>;
	}
}