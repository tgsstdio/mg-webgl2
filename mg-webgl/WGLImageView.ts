import {IMgDevice}
	from '../mg/IMgDevice';  
import {IMgAllocationCallbacks}
	from '../mg/IMgAllocationCallbacks';    
import {IMgImageView}
	from '../mg/IMgImageView';  

export class WGLImageView implements IMgImageView {
  private mTexture: WebGLTexture;
  constructor(texture: WebGLTexture) {
    this.mTexture = texture;
  }
  
  destroyImageView(
    device : IMgDevice
    , allocator : IMgAllocationCallbacks|null
  ) : void  {

  }
}
