import { MgAttachmentReference } from '../../mg/MgAttachmentReference'
import {MgImageLayout}
	from '../../mg/MgImageLayout';	
import { expect } from 'chai'

describe('MgAttachmentReference', () => {
  it('should have all fields initialized after new()', () => {
    let reference = new MgAttachmentReference();

    expect(reference).to.have.property('attachment')
      .which.is.eq(0); 
    expect(reference).to.have.property('layout')
      .which.is.eq(MgImageLayout.UNDEFINED);       
  });
});
