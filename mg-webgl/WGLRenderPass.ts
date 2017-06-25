import {IWGLRenderPass} from './IWGLRenderPass';
import {WGLClearAttachmentInfo} from './WGLClearAttachmentInfo';
import {MgAttachmentDescription} from '../mg/MgAttachmentDescription';
import {MgFormat} from '../mg/MgFormat'
import {IMgDevice} from '../mg/IMgDevice'
import {IMgAllocationCallbacks} from '../mg/IMgAllocationCallbacks'
import {WGLClearAttachmentType} from './WGLClearAttachmentType';

export class WGLRenderPass implements IWGLRenderPass {
  private mAttachmentFormats: Array<WGLClearAttachmentInfo>;
  get attachmentFormats(): Array<WGLClearAttachmentInfo> {
    return this.mAttachmentFormats;
  }

  constructor(descriptions: Array<MgAttachmentDescription>) {
    this.mAttachmentFormats = new Array<WGLClearAttachmentInfo> ();
    for (let desc of descriptions) {
      let info = new WGLClearAttachmentInfo();
      info.format = desc.format;
      info.loadOp = desc.loadOp;
      info.stencilLoadOp = desc.stencilLoadOp;
      info.attachmentType = WGLRenderPass.getAttachmentType (desc.format);
      info.divisor = WGLRenderPass.getAttachmentDivisor(desc.format);					
      this.mAttachmentFormats.push(info);
    }
  }

  destroyRenderPass(device: IMgDevice
    , allocator: IMgAllocationCallbacks|null
  ) : void {

  }    

  private static getAttachmentDivisor(
    format: MgFormat
  ) : number {
    switch (format)	{
      case MgFormat.D16_UNORM:
      case MgFormat.D16_UNORM_S8_UINT:
      case MgFormat.D24_UNORM_S8_UINT:
      case MgFormat.D32_SFLOAT:
      case MgFormat.D32_SFLOAT_S8_UINT:				
        return 1;

      case MgFormat.R8_SINT:				
      case MgFormat.R8G8_SINT:
      case MgFormat.R8G8B8_SINT:
      case MgFormat.R8G8B8A8_SINT:
        return 127; // sbyte.MaxValue;

      case MgFormat.R8_UINT:
      case MgFormat.R8G8_UINT:
      case MgFormat.R8G8B8_UINT:
      case MgFormat.R8G8B8A8_UINT:
        return 255; // byte.MaxValue;

      case MgFormat.R16_UINT:
      case MgFormat.R16G16_UINT:
      case MgFormat.R16G16B16_UINT:
      case MgFormat.R16G16B16A16_UINT:
        return 65535; // ushort.MaxValue;
      
      case MgFormat.R16_SINT:
      case MgFormat.R16G16_SINT:
      case MgFormat.R16G16B16_SINT:
      case MgFormat.R16G16B16A16_SINT:
        return 32767; // short.MaxValue;
      
      case MgFormat.R32_SINT:
      case MgFormat.R32G32_SINT:
      case MgFormat.R32G32B32_SINT:
      case MgFormat.R32G32B32A32_SINT:
        return 2147483647; // int.MaxValue;

      // return smaller of the two
      case MgFormat.R64_SINT:
      case MgFormat.R64G64_SINT:
      case MgFormat.R64G64B64_SINT:
      case MgFormat.R64G64B64A64_SINT:
        return 4294967295; // uint.MaxValue;

      case MgFormat.R32_UINT:
      case MgFormat.R64_UINT:
        return 4294967295; // uint.MaxValue;

      case MgFormat.R32_SFLOAT:
      case MgFormat.R32G32_SFLOAT:
      case MgFormat.R32G32B32_SFLOAT:
      case MgFormat.R32G32B32A32_SFLOAT:
        return 1;

      default:
        throw new Error("getAttachmentDivisor: format not supported");	
    }		
  }

  private static getAttachmentType (
    format: MgFormat
  ) : WGLClearAttachmentType {
      switch (format)	{
      case MgFormat.D16_UNORM:
      case MgFormat.D16_UNORM_S8_UINT:
      case MgFormat.D24_UNORM_S8_UINT:
      case MgFormat.D32_SFLOAT:
      case MgFormat.D32_SFLOAT_S8_UINT:				
        return WGLClearAttachmentType.DEPTH_STENCIL;

      case MgFormat.R8_SINT:
      case MgFormat.R8G8_SINT:
      case MgFormat.R8G8B8_SINT:
      case MgFormat.R8G8B8A8_SINT:
      case MgFormat.R16_SINT:
      case MgFormat.R16G16_SINT:
      case MgFormat.R16G16B16_SINT:
      case MgFormat.R16G16B16A16_SINT:
      case MgFormat.R32_SINT:
      case MgFormat.R32G32_SINT:
      case MgFormat.R32G32B32_SINT:
      case MgFormat.R32G32B32A32_SINT:
      case MgFormat.R64_SINT:
      case MgFormat.R64G64_SINT:
      case MgFormat.R64G64B64_SINT:
      case MgFormat.R64G64B64A64_SINT:
        return WGLClearAttachmentType.COLOR_INT;

      case MgFormat.R8_UINT:
      case MgFormat.R8G8_UINT:
      case MgFormat.R8G8B8_UINT:
      case MgFormat.R8G8B8A8_UINT:
      case MgFormat.R16_UINT:
      case MgFormat.R16G16_UINT:
      case MgFormat.R16G16B16_UINT:
      case MgFormat.R16G16B16A16_UINT:
      case MgFormat.R32_UINT:
      case MgFormat.R64_UINT:
        return WGLClearAttachmentType.COLOR_UINT;

      case MgFormat.R32_SFLOAT:
      case MgFormat.R32G32_SFLOAT:
      case MgFormat.R32G32B32_SFLOAT:
      case MgFormat.R32G32B32A32_SFLOAT:
        return WGLClearAttachmentType.COLOR_FLOAT;
      default:
        throw new Error('getAttachmentType: ' + format + ' not supported');	
    }
  }    

}
