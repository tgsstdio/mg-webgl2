import {IMgDisplayKHR} from './IMgDisplayKHR'
import {MgExtent2D} from './MgExtent2D'
import {MgSurfaceTransformFlagBitsKHR} from './MgSurfaceTransformFlagBitsKHR'

export class MgDisplayPropertiesKHR {
  display: IMgDisplayKHR;
  displayName: string;
  physicalDimensions: MgExtent2D;
  physicalResolution: MgExtent2D;
  supportedTransforms: MgSurfaceTransformFlagBitsKHR;
  planeReorderPossible: boolean;
  persistentContent: boolean;
}
