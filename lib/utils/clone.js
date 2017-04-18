
export function clone(obj) {
  return  JSON.parse(JSON.stringify(obj))
}

export function clone2(obj) {
  return Object.assign({},obj)
}
