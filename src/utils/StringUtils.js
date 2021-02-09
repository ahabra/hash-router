import * as ObjectUtils from './ObjectUtils'

export function indexOf(st, search, fromIndex, ignoreCase) {
  if (!st) return -1
  if (ignoreCase) {
    return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex)
  }
  return st.indexOf(search, fromIndex)
}

export function firstCharIndex(st, cb) {
  if (!cb || !st) return -1

  return st.split('').findIndex(cb)
}


export function lastCharIndex(st, cb) {
  if (!cb || !st) return -1

  const chars = st.split('')
  for (let i = chars.length; i >= 0; --i) {
    if (cb(chars[i])) return i
  }
  return -1
}

export function startsWith(st, search, ignoreCase) {
  if (ignoreCase) {
    const start = st.substring(0, search.length).toLowerCase()
    return search.toLowerCase() === start
  }

  return st.startsWith(search)
}

export function endsWith(st, search, ignoreCase) {
  if (ignoreCase) {
    return st.toLowerCase().endsWith(search.toLowerCase())
  }
  return st.endsWith(search)
}

export function removePrefix(st, prefix, ignoreCase) {
  if (startsWith(st, prefix, ignoreCase)) {
    st = st.substring(prefix.length)
  }
  return st
}

export function removeSuffix(st, suffix, ignoreCase) {
  if (endsWith(st, suffix, ignoreCase)) {
    st = st.substring(0, st.length - suffix.length)
  }
  return st
}

export function removeSurrounding(st, prefix, suffix, ignoreCase) {
  return removeSuffix(removePrefix(st, prefix, ignoreCase), suffix, ignoreCase)
}

export function substringAfter(st, search, ignoreCase) {
  if (!search) {
    return st
  }
  const i = indexOf(st, search, 0, ignoreCase)
  if (i < 0) return ''

  return st.substring(i + search.length)
}

export function substringBefore(st, search, ignoreCase) {
  if (!search) {
    return ''
  }
  const i = indexOf(st, search, 0, ignoreCase)
  if (i < 0) return st

  return st.substring(0, i)
}

export function trim(s) {
  if (!ObjectUtils.isString(s)) return ''
  return s.trim()
}
