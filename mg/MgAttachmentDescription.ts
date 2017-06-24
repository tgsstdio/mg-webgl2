import {MgAttachmentDescriptionFlagBits}
	from './MgAttachmentDescriptionFlagBits';	  
import {MgFormat}
	from './MgFormat';
import {MgSampleCountFlagBits}
	from './MgSampleCountFlagBits';	
import {MgAttachmentLoadOp}
	from './MgAttachmentLoadOp';	  
import {MgAttachmentStoreOp}
	from './MgAttachmentStoreOp';
import {MgImageLayout}
	from './MgImageLayout';	 

export class MgAttachmentDescription {
  flags: MgAttachmentDescriptionFlagBits;
  format: MgFormat;
  samples: MgSampleCountFlagBits;
  loadOp: MgAttachmentLoadOp;
  storeOp: MgAttachmentStoreOp;
  stencilLoadOp: MgAttachmentLoadOp;
  stencilStoreOp: MgAttachmentStoreOp;
  initialLayout: MgImageLayout;
  finalLayout: MgImageLayout;
}
