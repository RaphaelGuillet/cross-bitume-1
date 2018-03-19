$(document).ready(function() {
  // init controller
  var controller = new ScrollMagic.Controller();

  var wipeAnimation = new TimelineMax()
    .fromTo('section#chapitre-1a', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone }) // From bottom
    .fromTo('section#chapitre-1b', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone }) // From bottom
    .fromTo('section#chapitre-2', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2a', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2b', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2bb', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2c', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2d', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-3', 1, { x: '100%' }, { x: '0%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-4', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-5', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone })// From right


  // create a scene
  new ScrollMagic.Scene({
      triggerElement: '#container',
      triggerHook: 'onLeave',
      duration: '1100%' // = nombre de slides * 100 (pour un scroll naturel)
    })
    .setPin('#container')
    .setTween(wipeAnimation)
    .on("update", function (scene) {
      const progress = scene.target.progress()
       if (progress < (1/11)) {
        startVideo('intro')
      } else {
        stopVideo('intro')
      }
      if (progress > (2/11) && progress < (4/11)) {
        startVideo('chapitre-2')
      } else {
        stopVideo('chapitre-2')
      }
      if (progress > (5.5/11) && progress < (7/11)) {
        startVideo('chapitre-2c')
      } else {
        stopVideo('chapitre-2c')
      }
    })
    .addIndicators()
    .addTo(controller);
});

function startVideo(chapitre) {
  $('#'+chapitre+' video').addClass('active')
  $('#'+chapitre+' video')[0].play()
}

function stopVideo(chapitre) {
  $('#'+chapitre+' video').removeClass('active')
  $('#'+chapitre+' video')[0].pause()
}

/*
$(window).scroll(function() {
  var bottom_of_window =
  $(window).scrollTop() + $(window).height();
  //fade-in
  $('.fade-ani').each (function(){
      var bottom_of_object = $(this).position().top + $(this).outerHeight();
       if( bottom_of_window > bottom_of_object ){
        $(this).addClass('showing');
      }
      else{
        $(this).removeClass('showing');
      }
    });

  });
*/