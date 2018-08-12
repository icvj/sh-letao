$(function () {
  var str = getSearch("searchStr");
  console.log(str);

  $(".lt_search input").val(str);

  function render() {
    var searchStr = $(".lt_search input").val().trim();
    if (searchStr.length < 1) {
      return;
    }

    $(".lt_product").html('<div class="loading"></div>');

    var params = {};
    params.proName = searchStr;
    params.page = 1;
    params.pageSize = 100;

    var $sort = $(".lt_sort a[class='current'");
    if ($sort.length > 0) {
      $sort.each(function (index, ele) {
        if ($(this).data("type") == "price") {
          params.price = $(this).find("i").hasClass("fa-angle-down") ? 2 : 1;
        }
        if ($(this).data("type") == "num") {
          params.num = $(this).find("i").hasClass("fa-angle-down") ? 2 : 1;
        }
      })
    }

    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        success: function (info) {
          console.log(info);
  
          var htmlStr = template("tpl", info);
          $(".lt_product").html(htmlStr);
  
        }
      });
    }, 500);
  };

  render();

  $(".lt_search_btn").click(function () {
    var str = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(str);

    var searchStr = $(".lt_search input").val();
    var index = arr.indexOf(searchStr);
    if (index > -1) {
      arr.splice(index, 1);
    }

    arr.unshift(searchStr);

    if (arr.length > 10) {
      arr.pop();
    }

    str = JSON.stringify(arr);
    localStorage.setItem("search_list", str);

    render();
  });

  $("a[data-type]").click(function () {
    if ($(this).hasClass("current")) {
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      $(this).addClass("current").siblings().removeClass("current");
    }

    render();
  })
})