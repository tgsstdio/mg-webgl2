import { expect } from 'chai';
import {WGLCmdDepthBiasParameter} from '../mg-webgl/WGLCmdDepthBiasParameter'

describe('WGLCmdDepthBiasParameter', () => {
  it('should have all fields initialized after new()', () => {
    let temp = new WGLCmdDepthBiasParameter();

    expect(temp).to.have.property('depthBiasSlopeFactor')
      .which.is.a('number')
      .and.eq(0.0); 
    expect(temp).to.have.property('depthBiasClamp')
      .which.is.a('number')
      .and.eq(0.0);     
    expect(temp).to.have.property('depthBiasConstantFactor')
      .which.is.a('number')
      .and.eq(0.0);
  });
});