import { IMgSemaphore } from './IMgSemaphore'
import { MgPipelineStageFlagBits } from './MgPipelineStageFlagBits'

export class MgSubmitInfoWaitSemaphoreInfo {
  waitSemaphore: IMgSemaphore;
  waitDstStageMask: MgPipelineStageFlagBits;
}
