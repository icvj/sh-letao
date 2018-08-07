$(function () {
  $("#form").bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //设置校验规则
    fields: {
      username: {
          validators: {
              notEmpty: {
                  message: "用户名不能为空"
              },
              stringLength:{
                  min:6,
                  max:12,
                  message:"用户名长度必须是6-12位"
              }
          }
      },
      password:{
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            stringLength: {
              min: 6,
              max: 12,
              message: "密码必须是6-12位"
            }
          }
      }
    }
  });
})