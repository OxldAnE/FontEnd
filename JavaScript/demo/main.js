/* 以构造函数的原型对象为原型对象创建实例
 * 构造函数 this 绑定到实例并执行，为实例添加属性
 * new 当构造函数返回对象，会返回构造函数返回的对象，而不是新创建的对象 */
function myNew(constructor, ...args) {
    const o = Object.create(constructor.prototype)
    const res = constructor.apply(o, args)
    return res instanceof Object
           ? res
           : o
}

function F(a) {
    this.a = a
    this.A = function () {
        return this.a
    }
    // 返回对象
    return {
        a : 0,
        A() {
            return this.a
        },
    }
}

const o = myNew(F, 1)
const p = new F(1)
o.A() // 0
p.A() // 0

/* 不是同个实例 */
o.a = 1
console.log(p.A()) // 0
console.log(o.A === p.A) // false
