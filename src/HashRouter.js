import {Stringer} from '@techexp/jshelper'
import {cleanPath, getHashPath} from './utils/RouterUtils'
import {Route} from './utils/Route'

export function createRouter() {
  return new HashRouter()
}

class HashRouter {
  constructor() {
    this.routes = []

    const hashHandler = ev => hashChangeHandler(ev, this.routes)
    const loadHandler = ev => hashChangeHandler(ev, this.routes, true)

    window.addEventListener('hashchange', hashHandler, false)
    window.addEventListener('load', loadHandler, false)
  }

  add(path, handler) {
    this.routes.push({route: new Route(path), handler})
  }

  go(hashPath) {
    hashPath = '#' + cleanPath(hashPath)
    const base = Stringer.substringBefore(window.location.href, '#')
    const href = base + hashPath
    window.history.pushState(null, null, hashPath)
    window.location.href = href
  }
}


function hashChangeHandler(ev, routes, isLoad = false) {
  const newPath = getNewPath(ev, isLoad)
  if (newPath === undefined) return

  const params = {}
  const handler = findHandler(routes, newPath, params)
  if (handler) {
    handler(newPath, params)
  }
}

function getNewPath(ev, isLoad) {
  if (isLoad) {
    return getHashPath(ev.target.location.href)
  }
  const oldPath = getHashPath(ev.oldURL)
  const newPath = getHashPath(ev.newURL)

  return oldPath === newPath ? undefined : newPath
}

function findHandler(routes, path, params) {
  const found = routes.find(r => r.route.isMatch(path, params))
  return found ? found.handler : false
}
