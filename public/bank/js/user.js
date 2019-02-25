$(function () {

    var currentPage = 1;   //当前页
    var pageSize = 5;      //每页条数
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
})