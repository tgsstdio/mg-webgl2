import { expect } from 'chai';
import {MgPipelineColorBlendAttachmentState} from '../../mg/MgPipelineColorBlendAttachmentState'
import {MgBlendFactor} from '../../mg/MgBlendFactor'
import {MgBlendOp} from '../../mg/MgBlendOp'

describe('MgPipelineColorBlendAttachmentState', () => {
  it('should have all fields initialized after new()', () => {
    let temp = new MgPipelineColorBlendAttachmentState();

    expect(temp).to.have.property('blendEnable')
      .which.is.a('boolean')
      .and.is.false;  
    expect(temp).to.have.property('srcColorBlendFactor')
      .which.eq(MgBlendFactor.ZERO);  
    expect(temp).to.have.property('dstColorBlendFactor')
      .which.eq(MgBlendFactor.ZERO);  
    expect(temp).to.have.property('colorBlendOp')
      .which.eq(MgBlendOp.ADD); 
    expect(temp).to.have.property('srcAlphaBlendFactor')
      .which.eq(MgBlendFactor.ZERO);  
    expect(temp).to.have.property('srcAlphaBlendFactor')
      .which.eq(MgBlendFactor.ZERO);  
    expect(temp).to.have.property('colorBlendOp')
      .which.eq(MgBlendOp.ADD);                         
    expect(temp).to.have.property('colorWriteMask')
      .which.eq(0);            
  });
});