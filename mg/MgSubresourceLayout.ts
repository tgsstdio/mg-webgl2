/// <reference path="Magnesium.ts" />

export class MgSubresourceLayout {
  // WARN: offset requires UInt64 
  offset : number;
  // WARN: size requires UInt64 
  size : number;
  // WARN: rowPitch requires UInt64 
  rowPitch : number;
  // WARN: arrayPitch requires UInt64 
  arrayPitch : number;
  // WARN: depthPitch requires UInt64 
  depthPitch : number;
}
