$(function () {
    // 表单校验
    $('#form').bootstrapValidator({
        // 字段列表  field,  要先在 input 中配置 name 属性
        fields: {
            // 校验用户名
            username: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        // 提示信息
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度为2-6位'
                    },
                    // callback 专门用于配置回调提示消息
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                // 校验规则
                validators: {
                    // 非空
                    notEmpty: {
                        // 提示信息
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '密码长度必须是6-12位'
                    },
                    // callback 专门用于配置回调提示消息
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    })
})