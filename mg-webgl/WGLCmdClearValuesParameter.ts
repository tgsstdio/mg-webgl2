import {WGLCmdClearValueArrayItem} from './WGLCmdClearValueArrayItem'

export class WGLCmdClearValuesParameter {
	attachments: Array<WGLCmdClearValueArrayItem>;

	equals (other: WGLCmdClearValuesParameter) : boolean
	{
		if (this.attachments == null && other.attachments != null)
		{
			return false;
		}

		if (this.attachments != null && other.attachments == null)
		{
			return false;
		}

		if (this.attachments.length != other.attachments.length)
		{
			return false;
		}

		let noOfAttachments = this.attachments.length;
		for (let i = 0; i < noOfAttachments; i += 1)
		{
			if (!this.attachments [i].equals (other.attachments [i]))
				return false;
		}

		return true;
	}    
}
