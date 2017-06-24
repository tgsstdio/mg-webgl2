import {MgLogicOp} from '../mg/MgLogicOp';
import {MgBlendFactor} from '../mg/MgBlendFactor';
import {MgColor4f} from '../mg/MgColor4f';
import {WGLGraphicsPipelineBlendColorState}
  from './WGLGraphicsPipelineBlendColorState';
import {MgColorComponentFlagBits} from '../mg/MgColorComponentFlagBits';

export interface IWGLCmdBlendEntrypoint {
  enableLogicOp (logicOpEnable: boolean) : void;
  logicOp (logicOp: MgLogicOp): void;

  // NOT SURE IF THIS IS GETTING USED
  isEnabled(index: number): boolean;

  initialize(
    noOfAttachments: number
  ): WGLGraphicsPipelineBlendColorState;

  enableBlending(
    index: number
    , value: boolean
  ) : void;

  setColorMask(
    index: number
    , colorMask: MgColorComponentFlagBits
  ) : void;

  applyBlendSeparateFunction (
    index: number
    , colorSource: MgBlendFactor
    ,	colorDest: MgBlendFactor
    , alphaSource: MgBlendFactor 
    ,	alphaDest: MgBlendFactor
  ): void;
  
  setBlendConstants(blendConstants: MgColor4f): void;
}
