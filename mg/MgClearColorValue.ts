/// <reference path="MgColor4f.ts" />
/// <reference path="MgVec4i.ts" />
/// <reference path="MgVec4Ui.ts" />

namespace Magnesium {
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
      this.mValue = value as MgVec4i;
    }    

		get uint32() : MgVec4Ui {
      return this.mValue as MgVec4Ui;
    }   
  }
}