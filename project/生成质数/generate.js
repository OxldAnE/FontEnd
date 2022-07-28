/* 添加消息监听事件
 * 使用主脚本传来的 JSON 对象中的信息 */
addEventListener('message', (message) => {
  if (message.data.command === 'generate') {
    generatePrimes(message.data.quota)
  }
})

/* 生成给定数量的质数
 * 完成后发送消息 */
function generatePrimes (quota) {

  function isPrime (n) {
    for (let i = 2; i <= Math.sqrt(n); ++i) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  }

  const primes = []
  const max = 1000000

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (max + 1))
    if (isPrime(candidate)) {
      primes.push(candidate)
    }
  }

  postMessage(primes.length)
}
