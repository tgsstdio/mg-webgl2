import {IMgPipelineLayout} from '../../mg/IMgPipelineLayout';
import {WGLUniformBinding} from './WGLUniformBinding';
import {WGLBindingPointOffsetInfo} from './WGLBindingPointOffsetInfo';
import {WGLDynamicOffsetInfo} from '../WGLDynamicOffsetInfo';

export interface IWGLPipelineLayout extends IMgPipelineLayout {
  readonly bindings: Array<WGLUniformBinding>;
  readonly noOfBindingPoints: number;
  readonly ranges: Map<number, WGLBindingPointOffsetInfo>;
  readonly noOfStorageBuffers: number;
  readonly noOfExpectedDynamicOffsets: number;
  readonly offsetDestinations: Array<WGLDynamicOffsetInfo>;
}
