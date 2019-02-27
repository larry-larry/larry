$(function () {

    var currentPage = 1;  //当前页
    var pageSize = 5;     //总页数

    // 进入页面就渲染
    render();

    function render() {
        // 发送ajax请求
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('firstTpl', info);
                // 渲染tbody
                $('tbody').html(htmlStr);

                // 实现分页
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
                        // 点击页码发送ajax请求,渲染当前页面,封装ajax,复用
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    // 点击添加按钮显示模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show');
    })

    // 进行表单校验
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验字段
        fields: {
            // 用户名
            categoryName: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        // 提示信息
                        message: '请输入一级分类名称'
                    }
                }
            }
        }
    });


    // 注册表单校验成功事件,在事件中阻止默认提交行为,通过ajax提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();

        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),     //表单序列化,打包表单
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 如果成功,关闭模态框,重置表单
                    $('#addModal').modal('hide');
                    // 重新渲染页面到第一页
                    currentPage = 1;
                    render();

                    $('#form').data('bootstrapValidator').resetForm();
                }
            }
        })
    })
})