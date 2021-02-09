import {expect} from '@esm-bundle/chai'
import * as ObjectUtils from '../ObjectUtils'


describe('ObjectUtils', () => {

  describe('isString', () => {
    it('checks its argument', () => {
      expect(ObjectUtils.isString('')).to.be.true
    })

    it.skip('isString', () => {
      expect(true).to.be.false
    })
  })


})

