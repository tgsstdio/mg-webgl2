/// <reference path="GLCmdClearValueArrayItem.ts" />

namespace Magnesium {
  export class GLCmdClearValuesParameter {
    attachments: Array<GLCmdClearValueArrayItem>;

		equals (other: GLCmdClearValuesParameter) : boolean
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

			var noOfAttachments = this.attachments.length;
			for (let i = 0; i < noOfAttachments; i += 1)
			{
				if (!this.attachments [i].equals (other.attachments [i]))
					return false;
			}

			return true;
		}    
  }
}