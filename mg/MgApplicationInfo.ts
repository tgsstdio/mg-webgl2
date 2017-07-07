export class MgApplicationInfo {
  constructor() {
    this.applicationName = '';
    this.applicationVersion = 0;
    this.engineName = '';
    this.engineVersion = 0;
    this.apiVersion = 0;
  }

  applicationName: string;
  applicationVersion: number;
  engineName: string;
  engineVersion: number;
  apiVersion: number;

  static generateApiVersion(major:number, minor: number, patch: number) : number {
    // should be 32 bit
    return ( (major << 22) | (minor << 12) | (patch) );
  }    
}
