import {MgImageAspectFlagBits}
	from './MgImageAspectFlagBits';	  
import {MgClearValue}
	from './MgClearValue';

export class MgClearAttachment {
  aspectMask: MgImageAspectFlagBits;
  colorAttachment: number;
  clearValue: MgClearValue;
}
