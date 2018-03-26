var players = {};
var mainScene;

$(function () {
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
    .fromTo('section#chapitre-2cc', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2d', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-2dd', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone }) // From right
    .fromTo('section#chapitre-3', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-3b', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-5', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-5b', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-police', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-policeb', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-fresnes', 1, { y: '100%' }, { y: '0%', ease: Linear.easeNone })// From right
    .fromTo('section#chapitre-fresnesb', 1, { y: '100%' }, { y: '-100%', ease: Linear.easeNone })// From right

  // create a scene
  mainScene = new ScrollMagic.Scene({
      triggerElement: '#container',
      triggerHook: 'onLeave',
      duration: ($('section').length - 1) * 150 + '%'  // = nombre de slides * 100 (pour un scroll naturel)
    })
    .setPin('#container')
    .setTween(wipeAnimation)
    .on("update", scrollScene)
    .addIndicators()
    .addTo(controller); 

  // Ne pas toucher ! Ce petit bout de javascript génère les iframe youtube pour vous
  // Pour ajouter une video youtube: <div id="XXXX" data-video-id="YYY"></div>
  $('[data-vimeo-id]').each(function () {
    var $el = $(this)
    var chapitre = $el.parents('section').attr('id')
    //players[chapitre] = initPlayer($el.attr('id'))
  })
});

function startVideo(chapitre) {
  // $('#'+chapitre+' video').addClass('active')
  // $('#'+chapitre+' video')[0].play()
  var id = $(document.getElementById(chapitre)).find('[data-vimeo-id]').attr('id')
  players[chapitre] = players[chapitre] || initPlayer(id)
  players[chapitre].play()  
}


function stopVideo(chapitre) {
  if (players[chapitre] && players[chapitre].pause) {    
    players[chapitre].pause()
  }
}

function initPlayer(id) {
  var element = $("#" + id)

  return new Vimeo.Player(document.getElementById(id), {
    height: window.innerHeight,
    width: window.innerWidth,
    autoplay: true,
    background: true,
    autopause: false,
    loop: true
  });
}

function scrollScene() {
  const progress = mainScene.progress()

  if (progress < (1/18)) {
    startVideo('intro')
  } else {
    stopVideo('intro')
  }

  if (progress > (2/18) && progress < (4/18)) {
    startVideo('chapitre-2')
  } else {
    stopVideo('chapitre-2')
  }

  if (progress > (5.5/18) && progress < (8.5/18)) {
    startVideo('chapitre-2c')
  } else {
    stopVideo('chapitre-2c')
  }

  /* if (progress > (9.5/18) && progress < (10.5/18)) {
    startVideo('chapitre-3')
  } else {
    stopVideo('chapitre-3')
  } */

  if (progress > (11.5/18) && progress < (14/18)) {
    startVideo('chapitre-5')
  } else {
    stopVideo('chapitre-5')
  }
}

function resizeVideo(id) {
  var video = $('#' + id);

  if(window.innerWidth > window.innerHeight) {    
    var newWidth = video.outerHeight() * (16  / 9);
    var scale = window.innerWidth / newWidth
    video.css('width', newWidth + "px")
    video.css('transform-origin', 'left center')
  } else { 
    var newHeight = video.outerWidth() * (9 / 16);
    var scale = window.innerHeight / newHeight
    video.css('height', newHeight + "px")
    video.css('transform-origin', 'center top')
  }
  
  //Define the new width and centrally align the iframe
  video.css("transform", "scale(" + scale + ")");
}


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

