import {MgSharingMode}
	from './MgSharingMode';	  
import {MgBufferUsageFlagBits}
	from './MgBufferUsageFlagBits';
import {MgBufferCreateFlagBits}
	from './MgBufferCreateFlagBits';	

export class MgBufferCreateInfo	{
	constructor() {
		this.flags = 0;
		this.size = 0;
		this.usage = 0;
		this.sharingMode = MgSharingMode.EXCLUSIVE;
		this.queueFamilyIndexCount = 0;
		this.queueFamilyIndices = null;
	}

	flags: MgBufferCreateFlagBits;
	// WARN: size requires UInt64
	size: number;
	usage: MgBufferUsageFlagBits
	sharingMode: MgSharingMode;
	queueFamilyIndexCount: number;
	queueFamilyIndices: Array<number>|null;
}
