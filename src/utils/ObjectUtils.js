export function isString(s) {
  return isType(s, 'String')
}

export function isFunction(f) {
  return isType(f, 'Function')
}

function isType(v, type) {
  return Object.prototype.toString.call(v) === `[object ${type}]`
}

export function forEachEntry(object, func) {
  if (Array.isArray(object)) {
    object.forEach((v, index) => {
      func(index, v)
    })
    return
  }

  Object.entries(object).forEach(p => func(p[0], p[1]))
}

/** Check if the given object has a property with given name */
export function has(object, propName) {
  return Object.prototype.hasOwnProperty.call(object, propName)
}

