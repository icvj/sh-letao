$(function () {
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        $("tbody").html(template("tpl", info));

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  render();

  var targetId;
  var isDelete;
  $("tbody").on('click', '.btn', function () {
    $("#del_modal").modal('show');
    targetId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  $("#del_btn").click(function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: { 
        id: targetId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        
        $("#del_modal").modal('hide');

        render();
      }
    })
  })
});