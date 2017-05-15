/// <reference path="GLClearAttachmentType.ts" />
/// <reference path="../mg/MgAttachmentLoadOp.ts" />
/// <reference path="../mg/MgFormat.ts" />

namespace Magnesium {
  export class GLClearAttachmentInfo {
    format: MgFormat;
    loadOp: MgAttachmentLoadOp;
    stencilLoadOp: MgAttachmentLoadOp;
    attachmentType: GLClearAttachmentType;
    divisor: number;

		equals (other: GLClearAttachmentInfo ) : boolean
		{
			if (this.format != other.format)
				return false;

			if (this.loadOp != other.loadOp)
				return false;

			if (this.stencilLoadOp != other.stencilLoadOp)
				return false;

			if (this.attachmentType != other.attachmentType)
				return false;

			return Math.abs (this.divisor - other.divisor) <=  Number.EPSILON
		}    
  }
}