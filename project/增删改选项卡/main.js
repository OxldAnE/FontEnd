let that

class Tab {
  // 构造
  constructor (tab) {
    that = this
    this.tab = document.querySelector(tab)
    this.ul = this.tab.querySelector('ul')
    this.myAdd = this.tab.querySelector('.add')
    this.content = this.tab.querySelector('.content')
    this.init()
  }

  // 初始
  init () {
    // 	+
    this.myAdd.onclick = this.add
    this.updateNode()
  }

  // 更新节点
  updateNode () {
    // 	li
    this.lis = this.tab.querySelectorAll('li')
    // 	article
    this.articles = this.tab.querySelectorAll('article')
    // 	×
    this.removes = this.tab.querySelectorAll('.remove')
    // text
    this.texts = this.tab.querySelectorAll('.text')
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggle
      this.texts[i].ondblclick = this.edit
      this.articles[i].ondblclick = this.edit
      this.removes[i].onclick = this.remove
    }
  }

  // 清空类
  clearClass () {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.articles[i].className = ''
    }
  }

  // 切换
  toggle () {
    // 	清空类
    that.clearClass()
    // 	置为当前
    this.className = 'activeLi'
    that.articles[this.index].className = 'activeArticle'
  }

  // 增加
  add () {
    // 	在父节点的末尾插入
    let newLi =
      '<li><div class="text">新选项卡</div><button class="remove">×</button></li>'
    let newArticle = '<article>新内容</article>'
    that.ul.insertAdjacentHTML('beforeend', newLi)
    that.content.insertAdjacentHTML('beforeend', newArticle)
    that.updateNode()
    // 单击新选项卡
    that.lis[that.lis.length - 1].click()
  }

  // 移除
  remove (e) {
    // 阻止冒泡
    e.stopPropagation()
    // 	获取父节点的索引
    let i = this.parentNode.index
    that.lis[i].remove()
    that.articles[i].remove()
    that.updateNode()
    // 置为当前
    // 	存在激活选项卡，返回
    for (let i = 0; i < that.lis.length; i++) {
      if (that.lis[i].index === 'activeLi') {
        return
      }
    }
    // 删除项非首项，单击前一项
    // 删除项为首项，有后项，单击后一项
    if (i > 0) {
      that.lis[--i].click()
    } else if (i === 0 && that.lis[0]) {
      that.lis[0].click()
    }
  }

  // 编辑
  edit () {
    // 获取旧内容
    let str = this.innerHTML
    // 插入输入框
    // 选项卡，单行文本
    // 内容，多行文本域
    if (this.className === 'text') {
      this.innerHTML = '<input type="text">'
    } else {
      this.innerHTML = '<textarea></textarea>'
    }
    let myInput = this.children[0]
    // 用旧值初始化输入框，并选中
    myInput.value = str
    myInput.select()
    // 失焦，向父节点插入
    myInput.onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    // 文本域会将回车键入
    myInput.onkeyup = function (e) {
      if (e.key === 'Enter')
        this.blur()
    }
    // 增加回车失焦
  }
}

new Tab('.tab')
