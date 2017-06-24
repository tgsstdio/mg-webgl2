import {MgLogicOp} from '../mg/MgLogicOp';
import {MgBlendFactor} from '../mg/MgBlendFactor';
import {MgColor4f} from '../mg/MgColor4f';
import {WGLGraphicsPipelineBlendColorState}
  from './WGLGraphicsPipelineBlendColorState';
import {MgColorComponentFlagBits} from '../mg/MgColorComponentFlagBits';

export interface IWGLCmdBlendEntrypoint {
  // NO LOGIC OPS
  //enableLogicOp (logicOpEnable: boolean) : void;
  //logicOp (logicOp: MgLogicOp): void;

  initialize(
    noOfAttachments: number
  ): WGLGraphicsPipelineBlendColorState;

  enableBlending(    
    value: boolean
  ) : void;

  setColorMask(
    colorMask: MgColorComponentFlagBits
  ) : void;

  applyBlendSeparateFunction (
     colorSource: MgBlendFactor
    ,	colorDest: MgBlendFactor
    , alphaSource: MgBlendFactor 
    ,	alphaDest: MgBlendFactor
  ): void;
  
  setBlendConstants(blendConstants: MgColor4f): void;
}
