/// <reference path="MgPolygonMode.ts" />
/// <reference path="MgCullModeFlagBits.ts" />
/// <reference path="MgFrontFace.ts" />

namespace Magnesium {
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
}