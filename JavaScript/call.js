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

/* 在对象内添加调用函数并执行，再删除 */
Function.prototype.myCall = function () {
  // 获取绑定对象，null 时为全局调用
  let o           = arguments[0] || window,
      // 获取除绑定对象外的所有参数
      [, ...args] = arguments
  // 添加方法，this 指向调用者 f
  o.g = this
  // 接收执行结果
  let res = o.g(...args)
  // 删除方法
  delete o.g
  return res
}

// { a: 1, b: 2, c: 3 }
console.log(f.call(o, 2, 3))
// { a: 1, b: 2, c: 3 }
console.log(f.myCall(o, 2, 3))

