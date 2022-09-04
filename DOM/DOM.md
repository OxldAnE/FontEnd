# `DOM`

## 方法

### 元素

|          描述          |                示例                |
| :--------------------: | :--------------------------------: |
|      获取单个元素      |   `document.querySelector('ul')`   |
|      获取全部元素      | ` document.querySelectorAll('li')` |
|      获取 `html`       |     `document.documentElement`     |
|      获取 `body`       |          `document.body`           |
|        创建元素        |  ` document.createElement('li')`   |
| 添加子元素到父元素末尾 |        `ul.appendChild(li)`        |
|        删除元素        |           `li.remove()`            |
|     获取元素的内容     |           `li.innerHTML`           |
|     获取元素的类名     |           `li.className`           |
|      设置内联样式      |          `li.style.color`          |
|        设置属性        | `li.setAttribute('color', '#fff')` |

### 事件

|   描述   |               示例                |
| :------: | :-------------------------------: |
| 添加事件 | `li.addEventListener('click', f)` |
|          |                                   |
|          |                                   |

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