import {IMgImageView} from '../mg/IMgImageView';
import {IMgDevice} from '../mg/IMgDevice';
import {IMgAllocationCallbacks} from '../mg/IMgAllocationCallbacks';

export class WGLNullImageView implements IMgImageView {
  destroyImageView(
    device : IMgDevice
    , allocator : IMgAllocationCallbacks|null
  ) : void {

  }
}
