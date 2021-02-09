import {expect} from '@esm-bundle/chai'
import {Route} from '../Route'

describe('Route', ()=> {

  describe('constructor', ()=> {
    it('parses simple parts', ()=> {
      const route = new Route('a/b/c')
      const parts = route.parts
      expect(parts.length).to.equal(3)
      expect(parts[0]).to.eql({type: 'string', value: 'a'})
      expect(parts[1]).to.eql({type: 'string', value: 'b'})
      expect(parts[2]).to.eql({type: 'string', value: 'c'})
    })

    it('ignores empty parts', ()=> {
      const route = new Route(' a /  b ///  c   ////')
      const parts = route.parts
      expect(parts.length).to.equal(3)
      expect(parts[0]).to.eql({type: 'string', value: 'a'})
      expect(parts[1]).to.eql({type: 'string', value: 'b'})
      expect(parts[2]).to.eql({type: 'string', value: 'c'})
    })

    it('parse params', ()=> {
      const route = new Route('a/:id')
      const parts = route.parts
      expect(parts.length).to.equal(2)
      expect(parts[0]).to.eql({type: 'string', value: 'a'})
      expect(parts[1]).to.eql({type: 'param', value: 'id'})
    })

    it('parse regex', ()=> {
      const route = new Route('a/[.*]/c')
      const parts = route.parts
      expect(parts.length).to.equal(3)
      expect(parts[0]).to.eql({type: 'string', value: 'a'})
      expect(parts[1]).to.eql({type: 'regex', value: new RegExp('.*')})
      expect(parts[2]).to.eql({type: 'string', value: 'c'})
    })

  })

  describe('isMatch', ()=> {
    it('matches a simple path', ()=> {
      const route = new Route('a')
      expect(route.isMatch('a')).to.be.true
    })

    it('matches a path with blanks', ()=> {
      const route = new Route('a/b/c')
      expect(route.isMatch(' a /  b ///  c   ////')).to.be.true
    })

    it('matches params', ()=> {
      const route = new Route('a/:id')
      const params = {}

      expect(route.isMatch('a/42', params)).to.be.true
      expect(params).to.eql({id: '42'})
    })

    it('matches regexps', ()=> {
      const route = new Route('a/[x.*z]/c')
      expect(route.isMatch('a/xz/c')).to.be.true
      expect(route.isMatch('a/xyz/c')).to.be.true
    })

    it('does not match different length paths', ()=> {
      expect(new Route('a/b/c').isMatch('a/b')).to.be.false
      expect(new Route('a/b/c').isMatch('a/b/c/d')).to.be.false
    })
  })

})