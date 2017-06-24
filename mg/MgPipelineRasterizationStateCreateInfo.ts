import {MgPolygonMode} from './MgPolygonMode';
import {MgCullModeFlagBits} from './MgCullModeFlagBits';
import {MgFrontFace} from './MgFrontFace';

export class MgPipelineRasterizationStateCreateInfo	{
  flags : number;
  depthClampEnable : boolean;
  rasterizerDiscardEnable : boolean;
  polygonMode : MgPolygonMode;
  cullMode : MgCullModeFlagBits;
  frontFace : MgFrontFace;
  depthBiasEnable : boolean;
  depthBiasConstantFactor : number;
  depthBiasClamp : number;
  depthBiasSlopeFactor : number;
  lineWidth : number;
}
