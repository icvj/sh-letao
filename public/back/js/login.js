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
                  min: 2,
                  max: 6,
                  message:"用户名长度必须是2-6位"
              },
              callback: {
                message: "用户名不存在"
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
            },
            callback: {
              message: "密码错误"
            }
          }
      }
    }
  });

  $("[type='reset']").click(function () {
    $("form").data("bootstrapValidator").resetForm();
  });

  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      success: function (info) {
        console.log(info);
        //{success: true}
        if (info.success) {
          location.href = "index.html";
        }

        // {error: 1000, message: "用户名不存在! "}
        if (info.error === 1000) {
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        
        // {error: 1001, message: "密码错误！"}
        if (info.error === 1001) {
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    })
  })

})