/// <reference path="IMgAllocationCallbacks.ts" />
/// <reference path="MgResult.ts" />
/// <reference path="MgSubmitInfo.ts" />
/// <reference path="IMgFence.ts" />
/// <reference path="MgBindSparseInfo.ts" />
/// <reference path="MgPresentInfoKHR.ts" />

namespace Magnesium {
  export interface IMgQueue {
		queueSubmit(pSubmits : Array<MgSubmitInfo>, fence : IMgFence|null) : MgResult;
		queueWaitIdle() : MgResult;
		queueBindSparse(pBindInfo : Array<MgBindSparseInfo>, fence : IMgFence) : MgResult;
		queuePresentKHR(pPresentInfo : MgPresentInfoKHR) : MgResult;
  }
}