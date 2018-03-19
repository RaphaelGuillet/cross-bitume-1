$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();
  $('.header-bg').css ('top', -(scrollTop * 4) + 'px');

})

