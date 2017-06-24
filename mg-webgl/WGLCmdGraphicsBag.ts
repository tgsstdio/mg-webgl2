import {WGLCmdEncoderCollection} from './WGLCmdEncoderCollection';

export class WGLCmdGraphicsBag {
  draws: WGLCmdEncoderCollection<WGLCmdInternalDraw>;
  drawIndirects: WGLCmdEncoderCollection<WGLCmdInternalDrawIndirect>;
  drawIndexeds: WGLCmdEncoderCollection<WGLCmdInternalDrawIndexed>;
  pipelines: WGLCmdEncoderCollection<WGLCmdBoundPipelineRecordInfo>;
  depthBias: WGLCmdEncoderCollection<WGLCmdDepthBiasParameter>;
  blendConstants: WGLCmdEncoderCollection<MgColor4f>;
  scissors: WGLCmdEncoderCollection<WGLCmdScissorParameter>;
  viewports: WGLCmdEncoderCollection<WGLCmdViewportParameter>;
  stencilWrites: WGLCmdEncoderCollection<WGLCmdPipelineStencilWriteInfo>;
  stencilFunctions: WGLCmdEncoderCollection<WGLCmdStencilFunctionInfo>;
  descriptorSets: WGLCmdEncoderCollection<WGLCmdDescriptorSetParameter>;
  renderPasses: WGLCmdEncoderCollection<WGLCmdBeginRenderpassRecord>;
  vertexArrays: WGLCmdEncoderCollection<WGLCmdVertexBufferObject>;
  drawIndexedIndirects: WGLCmdEncoderCollection<WGLCmdInternalDrawIndexedIndirect>;

  constructor() {
    this.draws = new WGLCmdEncoderCollection<WGLCmdInternalDraw>();
    this.drawIndirects
      = new WGLCmdEncoderCollection<WGLCmdInternalDrawIndirect>();
    this.drawIndexeds
      = new WGLCmdEncoderCollection<WGLCmdInternalDrawIndexed>();
    this.pipelines
      = new WGLCmdEncoderCollection<WGLCmdBoundPipelineRecordInfo>();
    this.depthBias
      = new WGLCmdEncoderCollection<WGLCmdDepthBiasParameter>();
    this.blendConstants
      = new WGLCmdEncoderCollection<MgColor4f>(); 
    this.scissors
      = new WGLCmdEncoderCollection<WGLCmdScissorParameter>();
    this.viewports
      = new WGLCmdEncoderCollection<WGLCmdViewportParameter>();
    this.stencilWrites
      = new WGLCmdEncoderCollection<WGLCmdPipelineStencilWriteInfo>();
    this.stencilFunctions
      = new WGLCmdEncoderCollection<WGLCmdStencilFunctionInfo>();
    this.descriptorSets
      = new WGLCmdEncoderCollection<WGLCmdDescriptorSetParameter>();
    this.renderPasses
      = new WGLCmdEncoderCollection<WGLCmdBeginRenderpassRecord>();
    this.vertexArrays
      = new WGLCmdEncoderCollection<WGLCmdVertexBufferObject>();
    this.drawIndexedIndirects
      = new WGLCmdEncoderCollection<WGLCmdInternalDrawIndexedIndirect>();
  }

  clear() : void {
    this.draws.clear();
    this.drawIndirects.clear();
    this.drawIndexeds.clear();
    this.pipelines.clear();
    this.depthBias.clear();
    this.blendConstants.clear();
    this.scissors.clear();
    this.viewports.clear();
    this.stencilWrites.clear();
    this.stencilFunctions.clear();
    this.descriptorSets.clear();
    this.renderPasses.clear();
    this.vertexArrays.clear();
    this.drawIndexedIndirects.clear();
  }
}
