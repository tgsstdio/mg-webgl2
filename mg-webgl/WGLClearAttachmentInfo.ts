import {WGLClearAttachmentType} from './WGLClearAttachmentType';
import {MgAttachmentLoadOp} from '../mg/MgAttachmentLoadOp';
import {MgFormat} from '../mg/MgFormat';

export class WGLClearAttachmentInfo {
	format: MgFormat;
	loadOp: MgAttachmentLoadOp;
	stencilLoadOp: MgAttachmentLoadOp;
	attachmentType: WGLClearAttachmentType;
	divisor: number;

	equals (other: WGLClearAttachmentInfo ) : boolean
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
