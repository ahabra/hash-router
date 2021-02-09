import {cleanPath} from './RouterUtils'

export class Route {
  constructor(path) {
    this.parts = parsePath(path)
  }

  /**
   * Check if given path matches this route
   * @param {String} path
   * @param {Object, optional} params An object to populate with path parameters and values
   */
  isMatch(path, params = {}) {
    const pathItems = tokenizePath(path)
    if (this.parts.length !== pathItems.length) return false

    for (let i = 0; i < pathItems.length; i++) {
      const part = this.parts[i]
      const item = pathItems[i]
      if (! isPartMatch(part, item)) return false

      if (part.type === 'param') {
        params[part.value] = item
      }
    }
    return true
  }
}

/** Return an array of objects {type: 'param|regex|string', value: 'Value of part'} */
function parsePath(path) {
  return tokenizePath(path).map(p => parsePart(p))
}

function tokenizePath(path) {
  return cleanPath(path).split('/').map(p => p.trim()).filter(p => p.length > 0)
}

function parsePart(part) {
  if (part.startsWith(':')) {
    return {type: 'param', value: part.substring(1)}
  }

  if (part.startsWith('[') && part.endsWith(']')) {
    const value = part.substring(1, part.length - 1)
    return {type: 'regex', value: new RegExp(value)}
  }
  return {type: 'string', value: part}
}

function isPartMatch(part, s) {
  if (part.type === 'param') return true
  if (part.type === 'string') return s === part.value
  if (part.type === 'regex') return part.value.test(s)
  return false
}
