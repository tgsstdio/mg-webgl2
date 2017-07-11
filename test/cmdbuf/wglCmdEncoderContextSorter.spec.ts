import { expect } from 'chai';
import {WGLCmdEncoderContextSorter} from '../../mg-webgl/cmdbuf/WGLCmdEncoderContextSorter'
import {WGLCmdEncodingInstruction} from '../../mg-webgl/cmdbuf/WGLCmdEncodingInstruction'
import {WGLCmdEncoderCategory} from '../../mg-webgl/cmdbuf/WGLCmdEncoderCategory'

describe('WGLCmdEncoderContextSorter', () => {
  it('should be empty when initialized', () => {
    let sorter = new WGLCmdEncoderContextSorter();      
   
    expect(sorter).to.have.property('instructions').with.lengthOf(0);    
    expect(sorter).to.have.property('contexts').with.lengthOf(0);
  });

  it('should add one graphics instruction', () => {
    let sorter = new WGLCmdEncoderContextSorter();      
   
    expect(sorter).to.have.property('instructions').with.lengthOf(0);    
    expect(sorter).to.have.property('contexts').with.lengthOf(0);

    let inst = new WGLCmdEncodingInstruction();
    inst.category = WGLCmdEncoderCategory.GRAPHICS;
    inst.index = 0;
    sorter.add(inst);

    expect(sorter).to.have.property('instructions').with.lengthOf(1);    
    expect(sorter).to.have.property('contexts').with.lengthOf(1);

  });  
});