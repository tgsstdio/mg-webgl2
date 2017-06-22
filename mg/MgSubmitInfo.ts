import { MgSubmitInfoWaitSemaphoreInfo } from './MgSubmitInfoWaitSemaphoreInfo'
import { IMgCommandBuffer } from './IMgCommandBuffer'
import { IMgSemaphore } from './IMgSemaphore'

export class MgSubmitInfo {
  waitSemaphores: Array<MgSubmitInfoWaitSemaphoreInfo>;
  commandBuffers: Array<IMgCommandBuffer>;
  signalSemaphores: Array<IMgSemaphore>;
}
