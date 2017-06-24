import {IMgDevice} from './IMgDevice';
import {IMgAllocationCallbacks} from './IMgAllocationCallbacks';

export interface IMgSwapchainKHR {
  destroySwapchainKHR(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null) : void;
}

