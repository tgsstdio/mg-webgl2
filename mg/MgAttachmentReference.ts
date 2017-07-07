import {MgImageLayout}
	from './MgImageLayout';	

export class MgAttachmentReference {
  constructor() {
    this.attachment = 0;
    this.layout = MgImageLayout.UNDEFINED;
  }

  attachment: number;
  layout: MgImageLayout;
}
