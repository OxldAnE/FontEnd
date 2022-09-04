const data = [
  {
    name  : 1,
    score : 10,
  },
  {
    name  : 2,
    score : 11,
  },
  {
    name  : 3,
    score : 13,
  },
]
const table = document.querySelector('table')
const tbody = table.querySelector('tbody')

for (let i of data) {
  let tr = document.createElement('tr')
  for (let j in i) {
    let td = document.createElement('td')
    td.innerHTML = i[j]
    tr.appendChild(td)
  }
  let del = document.createElement('td')
  // 点击不跳转
  del.innerHTML = '<a href="javascript:;">删除</a>'
  tr.appendChild(del)
  tbody.appendChild(tr)
}

// 添加删除事件
let as = tbody.querySelectorAll('a')
as.forEach(a => {
  a.addEventListener('click', function () {
    tbody.removeChild(this.parentNode.parentNode)
  })
})