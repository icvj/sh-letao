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
  });

  $(".lt_history").on("click", ".delete_btn", function () {
    var arr = getHistory();
    var index = $(this).parent().data("index");
    arr.splice(index, 1);
    var str = JSON.stringify(arr);
    localStorage.setItem("search_list", str);

    render();
  });

  $(".lt_history").on("click", ".lt_clear_btn", function () {
    localStorage.setItem("search_list", "");
    render();
  })

})