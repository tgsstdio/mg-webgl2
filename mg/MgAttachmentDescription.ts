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
  constructor() {
    this.flags = 0;
    this.format = MgFormat.UNDEFINED;
    this.samples = 0;
    this.loadOp = MgAttachmentLoadOp.LOAD;
    this.storeOp = MgAttachmentStoreOp.STORE;
    this.stencilLoadOp = MgAttachmentLoadOp.LOAD;
    this.stencilStoreOp = MgAttachmentStoreOp.STORE;
    this.initialLayout = MgImageLayout.UNDEFINED;
    this.finalLayout = MgImageLayout.UNDEFINED;
  }

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
