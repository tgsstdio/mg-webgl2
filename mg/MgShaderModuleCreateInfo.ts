export class MgShaderModuleCreateInfo {
  flags : number;
  // WARN: codeSize requires UInt64 / UIntPtr
  codeSize : number;
  code : string;
}
