$(function () {
    // 表单校验
    $('#form').bootstrapValidator({
        // 字段列表  field,  要先在 input 中配置 name 属性
        fields: {
            // 校验用户名
            username: {

            },
            password: {}
        }
    })
})