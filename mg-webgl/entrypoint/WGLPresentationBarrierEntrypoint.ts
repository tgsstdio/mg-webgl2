import {IMgPresentationBarrierEntrypoint}
  from '../../mg/IMgPresentationBarrierEntrypoint';
import {IMgCommandBuffer}
  from '../../mg/IMgCommandBuffer';
import {IMgImage}
  from '../../mg/IMgImage';  

export class WGLPresentationBarrierEntrypoint
  implements IMgPresentationBarrierEntrypoint {
    
  submitPrePresentBarrier(prePresent: IMgCommandBuffer, image: IMgImage): void {

  }

  submitPostPresentBarrier(postPresent: IMgCommandBuffer, image: IMgImage): void {

  }
}
