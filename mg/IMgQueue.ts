import {MgSubmitInfo}
	from './MgSubmitInfo';	  
import {IMgFence}
	from './IMgFence';
import {MgResult}
	from './MgResult';	
import {MgBindSparseInfo}
	from './MgBindSparseInfo';
import {MgPresentInfoKHR}
	from './MgPresentInfoKHR';		

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
