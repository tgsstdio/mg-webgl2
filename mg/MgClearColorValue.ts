import {MgColor4f}
	from './MgColor4f';		
import {MgVec4i}
	from './MgVec4i';		
import {MgVec4Ui}
	from './MgVec4Ui';		

export class MgClearColorValue {
  private mValue: MgColor4f | MgVec4i | MgVec4Ui;

  get float32() : MgColor4f {
    return this.mValue as MgColor4f;
  }

  set float32(value: MgColor4f) {
    this.mValue = value;
  }

  get int32() : MgVec4i {
    return this.mValue as MgVec4i;
  }

  set int32(value: MgVec4i) {
    this.mValue = value;
  }    

  get uint32() : MgVec4Ui {
    return this.mValue as MgVec4Ui;
  }   

  set uint32(value: MgVec4Ui) {
    this.mValue = value;
  }        
}
