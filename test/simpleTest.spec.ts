import { assert } from 'chai'

describe('Number ES2015', () => {
  it('should accept Number.MAX_SAFE_INTEGER', () => {
    assert.isNotNull(Number.MAX_SAFE_INTEGER)
  })

  it('should accept Number.EPSILON', () => {
    assert.isNotNull(Number.EPSILON)
  });  
})
