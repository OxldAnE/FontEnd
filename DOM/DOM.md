# `DOM`

## 方法

### 元素

|          描述          |                示例                |
| :--------------------: | :--------------------------------: |
|      获取单个元素      |   `document.querySelector('ul')`   |
|      获取全部元素      | ` document.querySelectorAll('li')` |
|      获取 `html`       |     `document.documentElement`     |
|      获取 `body`       |          `document.body`           |
|       获取父节点       |          `li.parentNode`           |
|     获取所有子元素     |           `ul.children`            |
|     获取首个子元素     |       `ul.firstElementChild`       |
|   获取最后1个子元素    |       `ul.lastElementChild`        |
|    获取下个兄弟元素    |      `li.nextElementSibling`       |
|    获取上个兄弟元素    |    `li.previousElementSibling`     |
|        创建元素        |  ` document.createElement('li')`   |
| 添加子节点到父节点末尾 |        `ul.appendChild(li)`        |
| 在指定节点前插入子节点 |   `ul.insertBefore(li, lis[0])`    |
|        删除节点        |           `li.remove()`            |
|       删除子节点       |        `ul.removeChild(li)`        |
|     赋值节点及内容     |        `li.cloneNode(true)`        |
|     获取节点的内容     |           `li.innerHTML`           |
|      设置内联样式      |          `li.style.color`          |
|       获取属性值       |      `li.getAttribute('id')`       |
|       设置属性值       |    `li.setAttribute('id', 'l')`    |
|        移除属性        |     `li.removeAttribute('id')`     |

### 事件

![image-20220904223927048](assets/image-20220904223927048.png)

|   描述   |                 示例                 |
| :------: | :----------------------------------: |
| 添加事件 |  `li.addEventListener('click', f)`   |
| 删除事件 | `li.removeEventListener('click', f)` |

#### 事件类型

|          描述          |     示例     |
| :--------------------: | :----------: |
|        加载完成        |    `load`    |
|        写在完成        |   `unload`   |
|      窗口改变大小      |   `resize`   |
|       滚动条滚动       |   `scroll`   |
|        获得焦点        |   `focus`    |
|        失去焦点        |    `blur`    |
|          单击          |   `click`    |
|          双击          |  `dblclick`  |
|        鼠标按下        | `mousedown`  |
|        鼠标弹起        |  `mouseup`   |
| 鼠标穿过元素或其子元素 | `mouseover`  |
| 鼠标离开元素或其子元素 |  `mouseout`  |
|      鼠标穿过元素      | `mouseenter` |
|      鼠标离开元素      | `mouseleave` |
|        鼠标移动        | `mousemove`  |
|        按下键盘        |  `keydown`   |
|    按下键盘产生字符    |  `keypress`  |
|        弹起键盘        |   `keyup`    |

#### 事件对象

|      描述      |         示例          |
| :------------: | :-------------------: |
| 触发事件的对象 |      `e.target`       |
|    事件类型    |       `e.type`        |
|  阻止默认行为  | `e.preventDefault()`  |
|    阻止冒泡    | `e.stopPropagation()` |

### [鼠标跟随](鼠标跟随.html)

```js
let img = document.querySelector('img')
/* 将鼠标的在页面的坐标赋值给相对页面绝对定位图片的坐标 */
document.addEventListener('mousemove', function (e) {
  img.style.left = e.pageX + 'px'
  img.style.top = e.pageY + 'px'
})
```

### [放大输入框](放大输入框.html)

```js
const span = document.querySelector('span')
const input = document.querySelector('input')
// 键盘弹起触发才能将此次输入更新
input.addEventListener('keyup', function () {
  if (this.value === '') {
    span.style.display = 'none'
  }
  else {
    span.style.display = 'inline-block'
    span.innerText = this.value
  }
})
```

### [排他](排他.html)

```js
/* 设置当前项前，清空所有 */
const bs = document.querySelectorAll('button')
bs.forEach(b => {
  b.addEventListener('click', function () {
    bs.forEach(b => b.className = '')
    this.className = 'now'
  })
})
```

### [全选](全选.html)

```js
const h  = document.querySelector('.h'),
      ds = document.querySelectorAll('.d')
h.addEventListener('click', function () {
  ds.forEach(d => {
    d.checked = this.checked
  })
})
/* 先将结果置为 true
 * 如果有子项没被选中，将结果置为 false，退出遍历
 * 将结果赋给全选框 */
ds.forEach(d => {
  d.addEventListener('click', function () {
    let res = true
    let l = ds.length
    for (let i = 0; i < l; i++) {
      if (!ds[i].checked) {
        res = false
        break
      }
    }
    h.checked = res
  })
})
```

### [动态生成表格](动态生成表格/index.html)

```js
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
```