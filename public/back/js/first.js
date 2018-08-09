$(function () {
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        var htmlStr = template("tpl", info);
        $("tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(event, originalEvent, type, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  render();

  $("#add_btn").click(function () {
    $("#add_modal").modal("show");
  })

  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "分类名不能为空"
          }
        }
      }
    }
  });

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("form").serialize(),
      dataType: "json",
      success: function (info) {
        $("#add_modal").modal("hide");
        $("form").data("bootstrapValidator").resetForm(true);
        
        currentPage = 1;
        render();
      }
    })
  })
});