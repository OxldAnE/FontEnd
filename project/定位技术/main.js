// 指向当前实例
let that

class Tab {
  // 获取选项卡和面板的根节点
  constructor (myTab) {
    that = this
    this.tab = document.querySelector(myTab)
    this.init()
  }

  // 初始化
  // 获取选项卡和面板，并创建点击事件
  init () {
    // 获取选项卡和面板
    this.lis = this.tab.querySelectorAll('li')
    this.articles = this.tab.querySelectorAll('article')
    // 为每个选项卡创建点击事件
    for (let i = 0; i < this.lis.length; i++) {
      // 记录下标，在鼠标点击时，为面板索引使用
      // 保持选项卡和面板的下标一致
      this.lis[i].index = i
      // 选项卡点击触发调用
      this.lis[i].onclick = this.toggle
    }
  }

  // 先清除所有选项卡的和面板的类属性
  // 再为当前选项卡和面板激活类属性
  toggle () {
    // 由实例对象调用才能同时对选项卡和面板操作
    that.clearClass()
    // 当前调用为选项卡
    this.className = 'activeLi'
    // 由实例对象和选项卡索引找到对应的面板
    that.articles[this.index].className = 'activeArticle'
  }

  // 清除所有选项卡和面板的类属性
  // 实例对象调用
  clearClass () {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.articles[i].className = ''
    }
  }
}

new Tab('.tab')