/// <reference path="Magnesium.ts" />

namespace Magnesium {
	export enum MgCommandBufferResetFlagBits {
		// Release resources owned by the buffer
		RELEASE_RESOURCES_BIT = 1 << 0,
	}
}