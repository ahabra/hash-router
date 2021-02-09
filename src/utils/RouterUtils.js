import * as StringUtils from './StringUtils'

export function getHashPath(href) {
  href = StringUtils.substringAfter(href, '#')
  return cleanPath(href)
}

export function cleanPath(path) {
  const cb = c => c !== '/' && c !== '#'
  const start = StringUtils.firstCharIndex(path, cb)
  const end = StringUtils.lastCharIndex(path, cb)

  return path.substring(start, end)
}