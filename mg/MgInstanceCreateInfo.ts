import {MgApplicationInfo} from './MgApplicationInfo'

export class MgInstanceCreateInfo {
  flags : number;
  applicationInfo?: MgApplicationInfo;
  enabledLayerNames?: Array<string>;
  enabledExtensionNames?: Array<string>;
}
