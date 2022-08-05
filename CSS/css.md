# `CSS`



## 选择器

### 分类

- 基本选择器

  - 通用

  - 元素

  - 类

  -  `id`


- 组合选择器

  - 相邻兄弟

  - 随后兄弟

  - 子代

  - 后代


- 伪类

  - 结构性伪类

  - `UI` 伪类

  - 动态伪类


- 伪元素

---

- 伪类
  - 修饰属性
  - 可有多个
  - 位置不固定
- 伪元素
  - 创建对象
  - 只有1个
  - 必须在最后

![image-20220802105654158](assets/image-20220802105654158.png)

```html
<input type="checkbox">
```

```scss
input:checked::after {
  content: '已勾选';
  display: block;
  margin-left: 1em;
  width: 3em;
}	
```

---

### 三大特性

- 层叠性

  - 相同属性并且权重相同的样式应用到同个元素时，后面的样式覆盖前面的

  - 样式冲突时，遵循就近原则

- 继承性

  - 子元素继承父元素的一些样式（字体、文本、颜色等）

  - 简化代码

- 优先级

  - 范围越小，优先级越高

  - 内联样式  >  `id`  >  类、伪类、属性  >  元素、伪元素  >  通用、组合符、否定伪类

  - !important ，避免使用


---

## 盒模型

- 盒子模型
  - 外边距、边框、内边距、内容

---

### 外边距

#### 外边距使用细节

![image-20220802111918978](assets/image-20220802111918978.png)

```html
<div></div>
<div>
    <p></p>
</div>	
```

```scss
body {
  margin: 1em;
  border: 5px dotted #888;
}

div {
  &:nth-child(1) {
    background-color: $border-color;
    width: 8em;
    height: 8em;
  }

  &:nth-child(2) {
    background-color: $title-color;
    width: 4em;
    height: 4em;
  }

  p {
    background-color: #fff;
    width: 2em;
    height: 2em;
  }
}
```

---

- 顶端对齐

![image-20220802112248463](assets/image-20220802112248463.png)

```scss
 div:nth-child(1) {
    margin-bottom: -8em;
  }
```

---

- 父容器大小
  - `body`的边界是跟随着第二个盒子的下外边距


![image-20220802113131381](assets/image-20220802113131381.png)

```scss
div:nth-child(2) {
  margin-bottom: -3em;
}
```

---

- 外边距塌陷
  - 添加样式，实现 `p`元素与父元素底边贴合


![image-20220802113951049](assets/image-20220802113951049.png)

- 给 `p`元素添加上外边距
  - `p`元素与外元素一起下沉，即外边距塌陷

![image-20220802113353528](assets/image-20220802113353528.png)

  ```scss
  p {
  margin-top: 2em;
  }
  ```

---

- 以下方式均能达到预期的效果
  - 定位
    - 绝对定位脱离标准流，不影响父元素
    - 相对定位偏移
    - 子元素相对父元素偏移
  - 内边距

```scss
p {
  position: absolute;
  margin-top: 2em;
}	
```

  ```scss
  p {
    position: relative;
    top: 2em;
  }
  ```

  ```scss
  div:nth-child(2) {
    position: relative;
  }
  
  p {
    position: absolute;
    top: 2em;
  }
  ```

```scss
div:nth-child(2) {
  padding-top: 2em;
}
```

---

## 文本样式

#### 省略号

![image-20220802122039411](assets/image-20220802122039411.png)

```html
<p>这是一段超长的文本。给大伙演示下，如何使用省略号替换超宽文本。</p>
```

- 单行省略号

```scss
p {
  width: 5em; // 限制宽度
  white-space: nowrap; // 不换行
  overflow: hidden; // 溢出隐藏
  text-overflow: ellipsis; // 省略号
}
```

---

- 多行省略号
  - 使用伸缩盒子
  - 用伪元素添加省略号和用伪元素覆盖不需要时的省略号

- 伸缩盒子

![image-20220802122233835](assets/image-20220802122233835.png)

```scss
p {
  width: 5em; // 限制宽度
  overflow: hidden; // 溢出隐藏
  display: -webkit-box; // 弹性伸缩盒子
  -webkit-box-orient: vertical; // 垂直排列
  -webkit-line-clamp: 2; // 限制行数
}
```

- 伪元素

![image-20220802122834927](assets/image-20220802122834927.png)

![image-20220802122924009](assets/image-20220802122924009.png)

![image-20220802122946286](assets/image-20220802122946286.png)

```scss
p {
  line-height: 1em;
  height: 2em;
  overflow: hidden;
  padding-right: 1em; // 省略号的位置
  text-align: justify; // 两端对齐
  position: relative;

  // 固定在右下角的省略号
  &::before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }

  // 用底色盖住不需要时的省略号
  // 文本只剩一行会盖不住
  &::after {
    display: inline-block;
    content: '';
    width: 1em;
    height: 1em;
    background-color: $background-color;
    position: absolute;
    right: 0;
  }
}
```

---

## 布局

---

### 浮动

- 文字环绕
  - 浮动元素会压住 `p`元素，但不会压到文字
  - 浮动元素完全脱离文档流，不再占据文档流中的位置


---

- 清除浮动

![image-20220802150223812](assets/image-20220802150223812.png)

```html
<div>
    <p>1</p>
</div>
```

```scss
div {
  border: 5px dotted $border-color;

  p {
    background-color: $title-color;
    color: #fff;
  }
}
```

- 给 `p`加上浮动属性会影响会影响父元素的布局

![image-20220802150317467](assets/image-20220802150317467.png)

```scss
p {
  float: left;
}
```

---

- 以下方式均能清除浮动的影响
  - 对父元素进行溢出处理
  - 添加内容为空的块级伪元素用于清除浮动
  - 给父元素设置能够脱离标准流的定位
  - 更改父元素的显示类型

- 溢出处理

```scss
div {
  overflow: hidden;
}
```

```scss
div {
  overflow: auto;
}
```

```scss
div {
  overflow: scroll;
}
```

- 伪元素

```scss
div::after {
  content: '';
  display: block;
  clear: both;
}
```

- 定位

```scss
div {
  position: absolute;
}
```

```scss
div {
  position: fixed;
}
```

- 显示类型

```scss
div {
  display: inline-block;
}
```

```scss
div {
  display: flex;
}
```

```scss
div {
  display: grid;
}
```

```scss
div {
  display: -webkit-box;
}
```

```scss
div {
  display: flow-root;
}
```

---

### 定位

- 相对
  - 原来位置占用标准流空间
  - 用法：偏移位置
- 绝对
  - 相对于有定位的祖先元素
  - 用法：子元素绝对定位，父元素相对定位
- 固定
  - 相对于视口
  - 绝对或固定定位
    - 使得元素脱离标准流；
    - 元素的宽度默认由内容撑开，可设置宽高；


- 粘性
  - 随页面滚动而滚动到指定视口位置后固定

[定位使用案例](..\project\定位)

---

- 绝对定位和固定定位对不同显示类型元素的影响
  - 脱离标准流的行内块元素
    - 默认宽高由内容撑开，可设置宽高


![image-20220802161438473](assets/image-20220802161438473.png)

```html
<div>行内元素</div>
<div>块级元素</div>
<div>行内块元素</div>
<div>弹性盒子</div>
<div>网格盒子</div>
```

```scss
div {
  line-height: 1;
  color: #fff;

  &:nth-child(1) {
    display: inline;
    background-color: $title-color;
  }

  &:nth-child(2) {
    display: block;
    background-color: #000;
  }

  &:nth-child(3) {
    display: inline-block;
    background-color: $border-color;
  }

  &:nth-child(4) {
    display: inline-block;
    background-color: #884444;
  }

  &:nth-child(5) {
    display: inline-block;
    background-color: #0080ff;
  }
}
```

- 添加定位属性

![image-20220802161532222](assets/image-20220802161532222.png)


```scss
div {
  position: absolute;

  &:nth-child(1) {
    top: 1em;
  }

  &:nth-child(2) {
    top: 2em;
  }

  &:nth-child(3) {
    top: 3em;
  }

  &:nth-child(4) {
    top: 4em;
  }

  &:nth-child(5) {
    top: 5em;
  }
}
```

- 设置宽度

![image-20220802161616786](assets/image-20220802161616786.png)

```scss
div {
  width: 10em;
}
```

---

#### 水平居中

![image-20220802164720376](assets/image-20220802164720376.png)

```html
<div>
    <p></p>
</div>
```

```scss
div {
  background-color: $title-color;
  height: 1em;

  p {
    background-color: $border-color;
    height: 100%;
    width: 1em;
  }
}
```

----

- 以下方式均能实现子元素水平居中
  - 设置自动调整的左右外边距
  - 使用相对定位偏移和位移

![image-20220802164912428](assets/image-20220802164912428.png)

- 外边距

```scss
p {
  margin: 0 auto;
}
```

- 相对定位

```scss
p {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
```

---

#### 垂直居中

![image-20220802175949080](assets/image-20220802175949080.png)

```html
<div>
    <p></p>
</div>
```

```scss
div {
  background-color: $title-color;
  height: 3em;

  p {
    background-color: $border-color;
    height: 1em;
  }
}
```

---

- 以下方式均能实现子元素垂直居中
  - 弹性布局垂直居中对齐
  - 网格布局垂直居中对齐
  - 使用相对定位偏移和位移
  - 行内块元素垂直对齐

![image-20220802180133143](assets/image-20220802180133143.png)

- 弹性布局

```scss
p {
  width: 100%;
}

div {
  display: flex;
  align-items: center;
}
```

```scss
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

- 网格布局

```scss
div {
  display: grid;
  align-items: center;
}
```

- 相对定位

```scss
p {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

- 垂直对齐

![image-20220802183438351](assets/image-20220802183438351.png)

![image-20220802191927815](assets/image-20220802191927815.png)

```scss
div {
  p {
    display: inline-block;
    vertical-align: middle;
    width: 1em;
  }

  &::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
    width: 1em;
    background-color: #fff;
  }
}
```

---

#### 圣杯布局

![image-20220802201453656](assets/image-20220802201453656.png)

```html
<header>页眉</header>

<section>
    <div>主</div>
    <div>左</div>
    <div>右</div>
</section>

<footer>页眉</footer>
```

```scss
header, footer {
  background-color: #ccc;
}

div {
  &:nth-child(1) {
    background-color: #4ff;
  }

  &:nth-child(2) {
    background-color: #f4f;
  }

  &:nth-child(3) {
    background-color: #ff4;
  }
}
```

---

- 以下方式均能实现主体内容按左、主、右排列，左、右固定宽度，主自适应
  - 浮动结合外边距和位移
  - 弹性盒子更改排列顺序

![image-20220802202259889](assets/image-20220802202259889.png)

- 浮动

```scss
section {
  // 清除浮动
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  // 腾出左右区域的空间
  padding: 0 5em;
}

div {
  float: left;

  &:nth-child(1) {
    width: 100%;
  }

  &:nth-child(2) {
    width: 5em;
    margin-left: -100%;
    transform: translateX(-100%);
  }

  &:nth-child(3) {
    width: 5em;
    margin-left: -5em;
    transform: translateX(100%);
  }
}
```

- 弹性盒子

```scss
section {
  display: flex;
}

div {
  &:nth-child(1) {
    flex: 1;
  }

  &:nth-child(2) {
    flex: 0 0 5em;
    // 顺序提前
    order: -1;
  }

  &:nth-child(3) {
    flex: 0 0 5em;
  }
}
```

---

## 边框

### 边框使用技巧

- 绘制三角形

![image-20220802203504092](assets/image-20220802203504092.png)

```html
<div></div>
```

```scss
div {
  border: 1em solid $background-color;
  width: 1em;
  border-left-color: #000;
}
```

- 绘制圆形

![image-20220802203717528](assets/image-20220802203717528.png)

```html
<div></div>
```

```scss
div {
  width: 1em;
  height: 1em;
  background-color: #000;
  border-radius: 50%;
}
```

- 绘制照片图框

![image-20220802205250416](assets/image-20220802205250416.png)

```html
<img src="1.png">
```

```scss
img {
  box-shadow: 0 0 0 4px #000,
  0 0 0 6px #fff,
  -10px -10px $border-color,
  10px 10px $border-color;
}
```

---

## 背景

---

## 过渡

---

## 动画

---

## 变换
