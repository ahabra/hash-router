import {Stringer} from '@techexp/jshelper'

export function getHashPath(href) {
  href = Stringer.substringAfter(href, '#')
  return cleanPath(href)
}

export function cleanPath(path) {
  return Stringer.strip(path, ' /#')
}