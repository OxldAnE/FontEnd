let o = {
  a : 1,
}

function f (b, c) {
  return {
    a : this.a,
    b,
    c,
  }
}

Function.prototype.myApply = function () {
  let o             = arguments[0] || window,
      // 仅在这里与 call 有所不同
      [, [...args]] = arguments
  o.g = this
  let res = o.g(...args)
  delete o.g
  return res
}

// { a: 1, b: 2, c: 3 }
console.log(f.apply(o, [2, 3]))
// { a: 1, b: 2, c: 3 }
console.log(f.myApply(o, [2, 3]))

