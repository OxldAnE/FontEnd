let that

class Tab {

  constructor () {
    that = this
    this.tab = document.querySelector('.tab')
    this.ul = this.tab.querySelector('ul')
    this.myAdd = this.tab.querySelector('.add')
    this.content = this.tab.querySelector('.content')
    this.init()
  }

  init () {
    this.myAdd.addEventListener('click', this.add.bind(this))
    this.updateNode()
  }

  // 更新节点
  updateNode () {
    // 选项卡、选项卡的文本和叉号、内容
    this.lis = this.tab.querySelectorAll('li')
    this.removes = this.tab.querySelectorAll('.remove')
    this.texts = this.tab.querySelectorAll('.text')
    this.articles = this.tab.querySelectorAll('article')

    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].addEventListener('click', this.toggle)
      this.texts[i].addEventListener('dblclick', this.edit)
      this.articles[i].addEventListener('dblclick', this.edit)
      this.removes[i].addEventListener('click', this.remove)
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
    this.ul.insertAdjacentHTML('beforeend', newLi)
    this.content.insertAdjacentHTML('beforeend', newArticle)
    this.updateNode()
    // 单击新选项卡
    this.lis[this.lis.length - 1].click()
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
    }
    else if (i === 0 && this.lis[0]) {
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
    }
    else {
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
      if (e.key === 'Enter') {
        this.blur()
      }
    }
  }
}

new Tab()
