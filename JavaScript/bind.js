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

Function.prototype.myBind = function () {
  let o           = arguments[0] || window,
      [, ...args] = arguments
  o.g = this

  // 闭包
  return function () {
    let res = o.g(...args)
    delete o.g
    return res
  }
}

// { a: 1, b: 2, c: 3 }
console.log(f.bind(o, 2, 3)())
// { a: 1, b: 2, c: 3 }
console.log(f.myBind(o, 2, 3)())


