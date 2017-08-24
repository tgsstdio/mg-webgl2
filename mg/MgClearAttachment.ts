import {MgImageAspectFlagBits}
	from './MgImageAspectFlagBits';	  
import {MgClearValue}
	from './MgClearValue';

export class MgClearAttachment {
  aspectMask: MgImageAspectFlagBits;
  colorAttachment: number;
  clearValue: MgClearValue;

  /**
   *
   */
  constructor() {
    this.aspectMask = 0;
    this.colorAttachment = 0;
    this.clearValue = new MgClearValue();
  }
}
