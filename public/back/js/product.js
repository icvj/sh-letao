
$(function () {

  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
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
          onPageClicked: function (event, originalEvent, type, page) {
            currentPage = page;
            render();
          },
          itemTexts: function (type, page, current) {
            console.log(type, page, current);
            switch (type) {
              case "prev":
                return "上一页"
              case "next":
                return "下一页"
              case "first":
                return "首页"
              case "last":
                return "尾页"
              case "page":
                return page
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "prev":
                return "上一页"
              case "next":
                return "下一页"
              case "first":
                return "首页"
              case "last":
                return "尾页"
              case "page":
                return page
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }

  render();

  $("#add_btn").click(function () {
    $("#add_modal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        var htmlStr = template("tpl2", info);
        $("#dropdown").html(htmlStr);
      }
    })
  });

  $("#dropdown").on("click", "a", function () {
    var txt = $(this).text();
    $("#dropdown_text").text(txt);

    var id = $(this).data("id");
    $("[name=brandId").val(id);

    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      var res = data.result;
      picArr.unshift(res);

      $("#imgBox").prepend('<img src="' + res.picAddr + '" alt="" width="100">');

      if (picArr.length > 3) {
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }

      if (picArr.length >= 3) {
        $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });


  $("#form").bootstrapValidator({
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入非零开头的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入尺码"
          },
          regexp: {
            regexp: /^[1-9]\d-[1-9]\d$/,
            message: "格式 xx-xx"
          }
        }
      },
      pridce: {
        validators: {
          notEmpty: {
            message: "请输入现价"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入原价"
          },
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          },
        }
      }
    }
  });

  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();

    var str = $("#form").serialize();
    str += "&picAddr1=" + picArr[0].picAddr + "&picName1=" + picArr[0].picName;
    str += "&picAddr2=" + picArr[1].picAddr + "&picName2=" + picArr[1].picName;
    str += "&picAddr3=" + picArr[2].picAddr + "&picName3=" + picArr[2].picName;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: str,
      dataType: "json",
      success: function (info) {
        console.log(info);

        currentPage = 1;
        render();

        $("#add_modal").modal("hide");
        
        $("#form").data("bootstrapValidator").resetForm(true);
        $("#dropdown_text").text("");
        $("#img_box img").remove();
      }
    })
  });
});