import {expect} from '@esm-bundle/chai'
import * as HashRouter from '../HashRouter'

describe('HashRouter', () => {

  describe('hashChangeHandler', () => {
    it('fires handler associated with path', async()=> {
      const router = HashRouter.createRouter()

      router.add('b', (path) => {
        expect(path).to.equal('b')
      })

      window.location.href = '#b'
    })

    it('passes parameters to handler', async()=> {
      const router = HashRouter.createRouter()

      router.add('a/:id/:name/c', (path, params) => {
        expect(path).to.equal('a/42/bob/c')
        expect(params).to.eql({id: '42', name: 'bob'})
      })

      window.location.href = '#a/42/bob/c'
    })

  })

  describe('go', () => {
    it('changes href after hash', () => {
      const router = HashRouter.createRouter()

      router.go('abc')

      expect(window.location.href.endsWith('#abc')).to.be.true
    })
  })

})