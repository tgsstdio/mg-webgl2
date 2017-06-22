/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgPresentInfoKHR {
		waitSemaphores : Array<IMgSemaphore>;
		images : Array<MgPresentInfoKHRImage>;
	  results : Array<MgResult>;
  }
}