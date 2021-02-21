import {Stringer} from '@techexp/jshelper'

export function getHashPath(href) {
  href = Stringer.substringAfter(href, '#')
  return cleanPath(href)
}

export function cleanPath(path) {
  const cb = c => c !== '/' && c !== '#'
  const start = Stringer.indexOfFirstMatch(path, cb)
  const end = Stringer.indexOfLastMatch(path, cb)

  return path.substring(start, end)
}