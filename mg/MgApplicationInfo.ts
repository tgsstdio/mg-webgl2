/// <reference path="Magnesium.ts" />

namespace Magnesium {
  export class MgApplicationInfo {
    application: string;
    applicationVersion: number;
    engineName: string;
    engineVersion: number;
    apiVersion: number;

    static generateApiVersion(major:number, minor: number, patch: number) : number {
      // should be 32 bit
      return ( (major << 22) | (minor << 12) | (patch) );
    }    
  }
}