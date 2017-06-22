import { IMgSemaphore } from './IMgSemaphore'
import { MgPresentInfoKHRImage } from './MgPresentInfoKHRImage'
import { MgResult } from './MgResult'

export class MgPresentInfoKHR {
	waitSemaphores : Array<IMgSemaphore>;
	images : Array<MgPresentInfoKHRImage>;
	results : Array<MgResult>;
}
