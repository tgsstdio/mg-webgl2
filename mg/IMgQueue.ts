/// <reference path="Magnesium.ts" />

export interface IMgQueue {
	queueSubmit(
		pSubmits : Array<MgSubmitInfo>
		, fence : IMgFence|null) : MgResult;
	queueWaitIdle() : MgResult;
	queueBindSparse(
		pBindInfo : Array<MgBindSparseInfo>
		, fence : IMgFence) : MgResult;
	queuePresentKHR(
		pPresentInfo : MgPresentInfoKHR
	) : MgResult;
}
