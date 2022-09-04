/* 在进入函数后增加缩进，在返回前减小缩进，打印分隔符 */
let t = -1

function f (n) {
  t++
  // 递进终止条件
  if (n === 1) {
    t--
    console.log('---------------------------')
    return 1
  }
  let m = n - 1
  console.log(`${ '\t'.repeat(t) }n=${ n } m=${ m }`)
  let res = f(m) * n
  console.log(`${ '\t'.repeat(t) }res=${ res }`)
  t--
  console.log('---------------------------')
  return res
}

f(4)
