import {IMgRenderPass} from '../mg/IMgRenderPass';
import {WGLClearAttachmentType} from './pipeline/WGLClearAttachmentType';
import {WGLClearAttachmentInfo} from './pipeline/WGLClearAttachmentInfo';

export interface IWGLRenderPass extends IMgRenderPass {
  readonly attachmentFormats: Array<WGLClearAttachmentInfo>;
}
