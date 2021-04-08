import {expect} from '@esm-bundle/chai'
import * as RouterUtils from '../RouterUtils'

describe('RouterUtils', ()=> {

  describe('cleanPath', ()=> {
    const cleanPath = RouterUtils.cleanPath

    it('removes space, /, and #  from start and end of path', ()=> {
      expect(cleanPath('/a/')).to.equal('a')
      expect(cleanPath('#a#')).to.equal('a')
      expect(cleanPath('/#a#/')).to.equal('a')
      expect(cleanPath('#/a/#')).to.equal('a')
      expect(cleanPath(' # / a / # ')).to.equal('a')
    })
  })

})