$(function () {

  function getHistory() {
    var str = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(str);
    console.log(arr);
    return arr;
  }

  function render() {
    var arr = getHistory();
    var htmlStr = template("tpl", { arr: arr});
    $(".lt_history").html(htmlStr);
  }

  render();

  $(".lt_search_btn").click(function () {
    var arr = getHistory();

    var searchStr = $(".lt_search input").val();
    searchStr = searchStr.trim();
    $(".lt_search input").val("");

    if (searchStr == "") {
      mui.toast('请输入搜索内容',{ duration:'long', type:'div' });
      return;
    }
    
    var index = arr.indexOf(searchStr);
    if (index > -1) {
      arr.splice(index, 1);
    }

    arr.unshift(searchStr);

    if (arr.length > 10) {
      arr.pop();
    }

    var str = JSON.stringify(arr);
    localStorage.setItem("search_list", str);

    render();

    location.href = "search_list.html?searchStr=" + searchStr;
  });

  $(".lt_history").on("click", ".delete_btn", function () {
    mui.confirm("删除该条记录", "提示", ["取消", "确定"], function (e) {
      if (e.index == 1) {
        var arr = getHistory();
        var index = $(this).parent().data("index");
        arr.splice(index, 1);
        var str = JSON.stringify(arr);
        localStorage.setItem("search_list", str);
    
        render();

      }

    }, "div");

  });

  $(".lt_history").on("click", ".lt_clear_btn", function () {
    mui.confirm("清空所有搜索记录", "提示", ["取消", "确定"], function (e) {
      if (e.index == 1) {
        localStorage.setItem("search_list", "");
        render();
      }
    }, "div");
    
  })

})