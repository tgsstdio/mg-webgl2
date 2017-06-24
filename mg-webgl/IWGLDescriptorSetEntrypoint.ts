import {MgDescriptorSetAllocateInfo}
  from '../mg/MgDescriptorSetAllocateInfo';
import {MgResult} from '../mg/MgResult';
import {IMgDescriptorSet} from '../mg/IMgDescriptorSet';
import {IMgDescriptorPool} from '../mg/IMgDescriptorPool';
import {MgWriteDescriptorSet} from '../mg/MgWriteDescriptorSet';
import {MgCopyDescriptorSet} from '../mg/MgCopyDescriptorSet';

export interface IWGLDescriptorSetEntrypoint {
  allocate(
    pAllocateInfo: MgDescriptorSetAllocateInfo
    , out : { pDescriptorSets: Array<IMgDescriptorSet>|null } 
  ) : MgResult;

  free(
    descriptorPool: IMgDescriptorPool
    , pDescriptorSets: Array<IMgDescriptorSet>
  ) : MgResult;

  update(
    pDescriptorWrites: Array<MgWriteDescriptorSet>|null
    , pDescriptorCopies: Array<MgCopyDescriptorSet>|null
  ) : void;
}
