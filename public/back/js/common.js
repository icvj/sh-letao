$(function () {
  if (location.href.indexOf("login.html") == -1) {
    $.ajax({
      type: "get",
      url: "/employee/checkRootLogin",
      success: function (info) {
        console.log(info);
        if (info.success === true) {
  
        }
        else {
          location.href = "login.html";
        }
      }
    })
  };

  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });

  $(".lt_aside .category").click(function () {
    $(".lt_aside .child").stop().slideToggle();
  });

  $(".lt_topbar .icon_menu").click(function () {
    $(".lt_aside").toggleClass("hide_menu");
    $(".lt_topbar").toggleClass("hide_menu");
    $(".lt_main").toggleClass("hide_menu");
  });

  $(".lt_topbar .icon_out").click(function () {
    $("#logout_model").modal("show");
  });

  $("#logout_btn").click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function (info) {
        console.log(info);
        if (info.success === true) {
          location.href = "login.html";
        }
      }
    })
  });
});