import { expect } from 'chai';
import {WGLGraphicsPipelineBlendColorAttachmentState} from '../../mg-webgl/pipeline/WGLGraphicsPipelineBlendColorAttachmentState'
import {MgBlendFactor} from '../../mg/MgBlendFactor'
import {MgBlendOp} from '../../mg/MgBlendOp'

describe('WGLGraphicsPipelineBlendColorAttachmentState', () => {
  it('should be values in every property when initialized', () => {
    let color = new WGLGraphicsPipelineBlendColorAttachmentState();

    expect(color).to.have.property('blendEnable')
      .which.is.a('boolean')
      .and.eq(false);
    expect(color).to.have.property('srcColorBlendFactor')
      .and.eq(MgBlendFactor.ZERO);
    expect(color).to.have.property('dstColorBlendFactor')
      .and.eq(MgBlendFactor.ZERO);
    expect(color).to.have.property('colorBlendOp')
      .and.eq(MgBlendOp.ADD);
    expect(color).to.have.property('srcAlphaBlendFactor')
      .and.eq(MgBlendFactor.ZERO);
    expect(color).to.have.property('dstAlphaBlendFactor')
      .and.eq(MgBlendFactor.ZERO);
    expect(color).to.have.property('alphaBlendOp')
      .and.eq(MgBlendOp.ADD);
    expect(color).to.have.property('colorWriteMask')
      .and.eq(0);
  })
});