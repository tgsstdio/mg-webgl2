import {IWGLGraphicsPipeline} from './IWGLGraphicsPipeline';
import {WGLCmdGraphicsBag} from './WGLCmdGraphicsBag';
import {WGLCmdEncoderContextSorter} from './WGLCmdEncoderContextSorter';
import {WGLCmdIndexBufferParameter} from './WGLCmdIndexBufferParameter';
import {IMgBuffer} from '../mg/IMgBuffer';
import {MgIndexType} from '../mg/MgIndexType';

export interface IWGLCmdVertexArrayEncodingSection {
  readonly boundIndexBuffer: WGLCmdIndexBufferParameter|null;

  clear(): void;

  bindVertexBuffers(
    firstBinding: number
    , pBuffers: Array<IMgBuffer>
    , pOffsets: Array<number>|null
  ): void;    

  bindIndexBuffer(
    buffer: IMgBuffer
    , offset: number
    , indexType: MgIndexType
  ) : void;    

  pushIfRequired(
      pipeline: IWGLGraphicsPipeline
    , bag: WGLCmdGraphicsBag
    , instructions: WGLCmdEncoderContextSorter
  ): void;    
}
