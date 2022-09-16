$(function () {
    /* 读取本地数据
     * 返回将字符串转化成的对象或空数组 */
    function getData() {
        let data = localStorage.getItem('todoList')
        return data
               ? JSON.parse(data)
               : []
    }

    /* 存储本地数据
     * 存储Json字符串 */
    function setData(data) {
        localStorage.setItem('todoList', JSON.stringify(data))
    }

    /* 渲染数据
     * 将列表清空，读取
     * 遍历数据，查看是否完成，统计各自的个数，添加到相应的列表 */
    function loadData() {
        $('ol,ul').empty()
        let data = getData()
        let todoCount = 0
        let doneCount = 0
        $.each(data, function (index, item) {
            if (item.done) {
                doneCount++
                $('ul').prepend(
                    `<li><input type='checkbox' checked='checked'><p>${ item.title }</p><a href='javascript:' id='${ index }'></a></li>`)
            } else {
                todoCount++
                $('ol').prepend(
                    `<li><input type='checkbox'><p>${ item.title }</p><a href='javascript:' id='${ index }'></a></li>`)
            }
        })
        $('#todoCount').text(todoCount)
        $('#doneCount').text(doneCount)
    }

    /* 处理数据
     * 读取，处理，存储，渲染 */
    function dealData(callback) {
        let data = getData()
        callback(data)
        setData(data)
        loadData()
    }

    /* 添加事项
     * 回车事件，内容非空
     * 读取，添加表项，存储，渲染，清空输入框*/
    $('input').on({
        keydown : function (e) {
            if (e.key === 'Enter') {
                if (!$(this).val()) {
                    confirm('输入内容不能为空')
                } else {
                    dealData(data => {
                        data.push({
                            title : $(this).val(),
                            done  : false,
                        })
                    })
                    $(this).val('')
                }
            }
        },
    })
    loadData()

    /* 删除待办事项
     * 点击事件，读取，删除表项，存储，渲染 */
    $('ol,ul').on('click', 'a', function () {
        dealData(data => {
            data.splice($(this).attr('id'), 1)
        })
    })

    /* 勾选完成
     * 读取，存储，渲染 */
    $('ol,ul').on('click', 'input', function () {
        dealData(data => {
            let id = $(this).siblings('a').attr('id')
            data[id].done = $(this).prop('checked')
        })
    })
})