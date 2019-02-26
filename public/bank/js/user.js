$(function () {

    var currentPage = 1;   //当前页
    var pageSize = 5;      //每页条数

    // 全局声明id,表示正在编辑的用户
    var currentId;
    // 标记修改用户成什么状态
    var isDelete;

    // 进入页面需要渲染
    render();

    // 发送ajax请求,利用模板引擎动态渲染数据
    // 封装
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                // 渲染tbody
                var htmlStr = template('tpl', info);
                $('tbody').html(htmlStr);

                // 利用插件实现分页
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        // 点击页码需要重新渲染页面,所以需要发送ajax请求,上面已经请求过了,可以封装复用
                        // 点击更新当前页,并重新渲染数据
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 利用事件委托注册点击事件,让模态框显示出来,因为是动态渲染的数据,所以需要事件委托注册
    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');

        // 点击的时候获取点击的是哪一个用户,获取到点击元素身上的id
        currentId = $(this).parent().data('id');

        // 获取当前用户的状态
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })

    // 点击模态框里的确定按钮发送ajax请求
    $('#confirmBtn').click(function () {

        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                // 如果成功关闭模态框
                if (info.success) {
                    $('#userModal').modal('hide');
                    // 重新渲染页面
                    render();
                }
            }
        })
    })
})