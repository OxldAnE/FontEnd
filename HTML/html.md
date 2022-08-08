# `HTML`

## 文档

- 初始化样式

```scss
/* 
网页的初始化样式
 */
$background-color: #C7EDCC;
$title-color: #00664d;
$border-color: #880088;

/* 清除元素默认的内外边距 */
* {
  margin: 0;
  padding: 0;
}

/* 盒子模型以边框为界计算盒子大小 */
* {
  box-sizing: border-box;
}

/* 主体背景颜色，字体，字体颜色 */
html {
  background-color: $background-color;
  font: normal 400 10px 'Segoe UI',
  Helvetica,
  Arial,
  \\5B8B\4F53, sans-serif;
}

/* 合并相邻表格单元格的边框 */
table,
td {
  border-collapse: collapse;
}

/* 列表项的符号 */
li {
  list-style-type: none;
}

/* 将图片由基线对齐改为中线对齐，去掉底部的缝隙 */
img {
  vertical-align: middle;
}

/* 将按钮的鼠标变为小手 */
button {
  cursor: pointer;
}

/* 取消按钮和输入表单外轮廓线 */
button,
input {
  outline: none;
}

/* 取消链接的下划线 */
a {
  color: $border-color;
  text-decoration: none;
}

/* 鼠标悬停链接上时变为红色 */
a:hover {
  color: $title-color;
}

/* 不生成隐藏元素 */
.hide,
.none {
  display: none;
}

/* 通过伪元素，在末尾插入内容为空的块级元素
用于清除浮动 */
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
```

---

- `href`
  - 需要时点击链接，跳转到引用资源
  
- `src`
  - 资源直接下载，嵌入到文档中

---

### 属性

- `data-`
  - 自定义属性
- `contenteditable`
  - 用户可编辑
- `dir`
  - 文字方向
- `draggable`
  - 拖放
  - `dropzone`
- `hidden`
  - 隐藏元素
- `tabindex`
  - 按`Tab`键切换元素


---

## 文字

---

## 结构

### 语义化标签

```html
<header>页眉
    <h1>页面标题</h1>
    <nav>导航栏</nav>
</header>

<main>主体内容
    <section>章节
        <h2>章节标题</h2>
    </section>

    <article>独立完整的内容</article>

    <aside>侧边栏</aside>
</main>

<footer>页脚</footer>
```

---

## 表格

- 在行和列的标题间产生视觉关联，便于快速查找信息

---

## 表单

### 表单控件

|  控件类型  |              功能              |
| :--------: | :----------------------------: |
|   `text`   |            单行文本            |
| `password` |              密码              |
|  `radio`   |             单选框             |
| `checkbox` |             复选框             |
|  `submit`  |              提交              |
|  `reset`   |              重置              |
|  `button`  | 没有默认效果，用于 `js` 自定义 |
|   `file`   |            文件选择            |
|  `email`   |            电子邮件            |
|  `search`  |             搜索栏             |
|   `tel`    |            电话号码            |
|   `url`    |              网址              |
|  `number`  |              数值              |
|  `range`   |              滑块              |
|   `date`   |              日期              |
|   `time`   |              时间              |
|  `color`   |              颜色              |
| `textarea` |            多行文本            |
|  `select`  |             下拉框             |
|  `option`  |            下拉选项            |
| `progress` |             进度条             |

---

### 表单验证

|         属性          |    功能    |
| :-------------------: | :--------: |
|      `required`       |    必填    |
| `maxlength/minlength` |  长度限制  |
|       `max/min`       |  大小限制  |
|        `type`         |    类型    |
|       `pattern`       | 正则表达式 |

---

## 嵌入内容

### 响应式图片

- 裁剪图片

```html
<picture>
    <source media="(max-width:799px)" srcset="裁剪图片400宽.png">
    <source media="(min-width: 800px)" srcset="裁剪图片800宽.png">
    
    <img src="裁剪图片800宽.png" alt="裁剪图片">
</picture>
```

- 分辨率切换

```html
<img src="分辨率800.png" alt="不同分辨率的图片" srcset="分辨率400.png,分辨率600.png 1.5x,分辨率800.png 2x">
```

---

### 矢量图

- 适合手动编写简单的图像
- 细节丰富的图像适合使用光栅图形

---

### 视频音频

- 提供不同格式的播放源以提高兼容性
- `type` 属性有助于浏览器跳过不支持的格式

---

### 内嵌框架

- 其他页面嵌入到当前页面
- 使用：内嵌视频或地图