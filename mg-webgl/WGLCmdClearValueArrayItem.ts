/// <reference path="WGLClearAttachmentInfo.ts" />
/// <reference path="WGLClearAttachmentType.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="../mg/MgClearValue.ts" />

namespace Magnesium {
  export class WGLCmdClearValueArrayItem {
    attachment: WGLClearAttachmentInfo;
    value: MgClearValue;
    color: MgColor4f;

    equals(other: WGLCmdClearValueArrayItem ): boolean
		{
			if (!this.attachment.equals(other.attachment))
			{
				return false;
			}

      if (!this.color.equals(other.color)) {
          return false;
      }

			switch (this.attachment.attachmentType)	{
			case WGLClearAttachmentType.COLOR_FLOAT:
				return this.value.color.float32.equals (other.value.color.float32);
			case WGLClearAttachmentType.COLOR_INT:
				return this.value.color.int32.equals (other.value.color.int32);
			case WGLClearAttachmentType.COLOR_UINT:
				return this.value.color.uint32.equals (other.value.color.uint32);
			case WGLClearAttachmentType.DEPTH_STENCIL:				
				return this.value.depthStencil.equals(other.value.depthStencil);
			default:
				throw new Error('Not supported');
			}


		}    
  }
}