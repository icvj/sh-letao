$(function () {
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var str = template("tpl", info);
        $("tbody").html(str);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type, page){
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  render();

  $("#add_btn").click(function () {
    $("#add_modal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var str = template("tpl2", info);
        $("#dropdown").html(str);
      }
    })
  });

  $("#dropdown").on("click", "a", function () {
    $("#dropdown_text").text($(this).text());
    $("#categoryId").val($(this).data("id"));

    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });

  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      console.log(data.result);
      $("#brand_img").attr("src", data.result.picAddr); 
      $("[name='brandLogo']").val(data.result.picAddr);
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  $("form").bootstrapValidator({
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          },
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类图片'
          },
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '二级分类名不能为空'
          },
        }
      },
    }
  });

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);

        currentPage = 1;
        render();

        $("#add_modal").modal("hide");
        $("form").data("bootstrapValidator").resetForm(true);
        $("#brand_img").attr("src", "./images/none.png");
        $("#dropdown_text").text("请选择一级分类");
      }
    })
  })
});