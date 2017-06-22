import {MgSpecializationMapEntry} from './MgSpecializationMapEntry'

export class MgSpecializationInfo {
  mapEntries : Array<MgSpecializationMapEntry>;
  // WARN: dataSize requires UInt64 / UIntPtr
  dataSize : number;
  // WARN: IntPtr 
  data : Uint8Array;
}
