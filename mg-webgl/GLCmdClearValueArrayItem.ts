/// <reference path="GLClearAttachmentInfo.ts" />
/// <reference path="GLClearAttachmentType.ts" />
/// <reference path="../mg/MgColor4f.ts" />
/// <reference path="../mg/MgClearValue.ts" />

namespace Magnesium {
  export class GLCmdClearValueArrayItem {
    attachment: GLClearAttachmentInfo;
    value: MgClearValue;
    color: MgColor4f;

    equals(other: GLCmdClearValueArrayItem ): boolean
		{
			if (!this.attachment.equals(other.attachment))
			{
				return false;
			}

      if (!this.color.equals(other.color)) {
          return false;
      }

			switch (this.attachment.attachmentType)	{
			case GLClearAttachmentType.COLOR_FLOAT:
				return this.value.color.float32.equals (other.value.color.float32);
			case GLClearAttachmentType.COLOR_INT:
				return this.value.color.int32.equals (other.value.color.int32);
			case GLClearAttachmentType.COLOR_UINT:
				return this.value.color.uint32.equals (other.value.color.uint32);
			case GLClearAttachmentType.DEPTH_STENCIL:				
				return this.value.depth.equals(other.value.depth);
			default:
				throw new Error('Not supported');
			}


		}    
  }
}