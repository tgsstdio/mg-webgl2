import {IMgDevice} from './IMgDevice'
import {IMgAllocationCallbacks} from './IMgAllocationCallbacks'

export interface IMgBufferView {
  destroyBufferView(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}
