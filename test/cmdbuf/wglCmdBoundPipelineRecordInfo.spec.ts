import { expect } from 'chai';
import {WGLCmdBoundPipelineRecordInfo} from '../../mg-webgl/cmdbuf/WGLCmdBoundPipelineRecordInfo'
import {MgColor4f} from '../../mg/MgColor4f'
import {WGLCmdScissorParameter} from '../../mg-webgl/cmdbuf/WGLCmdScissorParameter'
import {WGLCmdViewportParameter} from '../../mg-webgl/cmdbuf/WGLCmdViewportParameter'
import {WGLCmdDepthBiasParameter} from '../../mg-webgl/cmdbuf/WGLCmdDepthBiasParameter'

describe('WGLCmdBoundPipelineRecordInfo', () => {
  it('should have all fields initialized after new()', () => {
    let record = new WGLCmdBoundPipelineRecordInfo();

    expect(record).to.have.property('blendConstants')
      .which.is.an.instanceOf(MgColor4f);
    expect(record).to.have.property('frontStencilWriteMask')
      .which.is.a('number')
      .and.eq(0);     
    expect(record).to.have.property('backStencilWriteMask')
      .which.is.a('number')
      .and.eq(0);
    expect(record).to.have.property('scissors')
      .which.is.null;
    expect(record).to.have.property('viewports')
      .which.is.null;
    expect(record).to.have.property('depthBias')
      .which.is.a.instanceOf(WGLCmdDepthBiasParameter);     
  });
});