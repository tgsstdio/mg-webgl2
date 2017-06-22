/// <reference path="Magnesium.ts" />

export enum MgCommandPoolCreateFlagBits {
	// Command buffers have a short lifetime
	TRANSIENT_BIT = 1 << 0,
	// Command buffers may release their memory individually
	RESET_COMMAND_BUFFER_BIT = 1 << 1,
}
