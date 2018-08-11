$(function () {

  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (info) {
      console.log(info);
      var htmlStr = template("tpl", info);
      $(".lt_category_left ul").html(htmlStr);

      renderSecondById(info.rows[0].id);
    }
  })

  function renderSecondById(id) {
    console.log(id);
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: { id: id},
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("tpl2", info);
        $(".lt_category_right ul").html(htmlStr);
      }
    })
  };

  $(".lt_category_left ul").on("click", "a", function () {
    var id = $(this).data("id");
    renderSecondById(id);
    $(this).addClass("current").parent().siblings().find(".current").removeClass("current");
  })

});