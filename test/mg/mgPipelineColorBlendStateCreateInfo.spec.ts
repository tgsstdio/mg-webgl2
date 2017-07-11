import { expect } from 'chai';
import {MgPipelineColorBlendStateCreateInfo} from '../../mg/MgPipelineColorBlendStateCreateInfo'
import {MgLogicOp} from '../../mg/MgLogicOp'
import {MgColor4f} from '../../mg/MgColor4f'

describe('MgPipelineColorBlendStateCreateInfo', () => {
  it('should be values in every property when initialized', () => {
    let temp = new MgPipelineColorBlendStateCreateInfo();

    expect(temp).to.have.property('flags')
      .which.is.a('number')
      .and.eq(0);
    expect(temp).to.have.property('logicOpEnable')
      .which.is.a('boolean')
      .and.is.false;
    expect(temp).to.have.property('logicOp')
      .and.eq(MgLogicOp.CLEAR);
    expect(temp).to.have.property('attachments')
      .and.is.null; 
    expect(temp).to.have.property('blendConstants')
      .which.is.an.instanceOf(MgColor4f)     
  });
});
  