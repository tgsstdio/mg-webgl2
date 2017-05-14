/// <reference path="IMgSemaphore.ts" />
/// <reference path="MgPresentInfoKHRImage.ts" />

namespace Magnesium {
  export class MgPresentInfoKHR {
		waitSemaphores : Array<IMgSemaphore>;
		images : Array<MgPresentInfoKHRImage>;
	  results : Array<MgResult>;
  }
}