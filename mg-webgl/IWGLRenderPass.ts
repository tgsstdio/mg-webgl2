import {IMgRenderPass} from '../mg/IMgRenderPass';
import {WGLClearAttachmentType} from './WGLClearAttachmentType';
import {WGLClearAttachmentInfo} from './WGLClearAttachmentInfo';

export interface IWGLRenderPass extends IMgRenderPass {
  readonly attachmentFormats: Array<WGLClearAttachmentInfo>;
}
