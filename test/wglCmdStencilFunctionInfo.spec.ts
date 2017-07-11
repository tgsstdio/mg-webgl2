import { expect } from 'chai';
import {WGLCmdStencilFunctionInfo} from '../mg-webgl/WGLCmdStencilFunctionInfo'
import {MgCompareOp} from '../mg/MgCompareOp'

describe('MgPipelineColorBlendAttachmentState', () => {
  it('should have all fields initialized after new()', () => {
    let temp = new WGLCmdStencilFunctionInfo();

    expect(temp).to.have.property('referenceMask')
      .which.is.a('number')
      .and.eq(0);  
    expect(temp).to.have.property('stencilFunction')
      .which.eq(MgCompareOp.NEVER);  
    expect(temp).to.have.property('compareMask')
      .which.is.a('number')
      .and.eq(0);     
  });
});