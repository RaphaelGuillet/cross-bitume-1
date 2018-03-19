var players;
var mainScene;

function onYouTubeIframeAPIReady() {
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
  mainScene = new ScrollMagic.Scene({
      triggerElement: '#container',
      triggerHook: 'onLeave',
      duration: '800%' // = nombre de slides * 100 (pour un scroll naturel)
    })
    .setPin('#container')
    .setTween(wipeAnimation)
    .on("update", scrollScene)
    .addIndicators()
    .addTo(controller);

  players = {
    'intro': initPlayer('intro-player'),
    'chapitre-2': initPlayer('chapitre-2-player'),
  }
}

function startVideo(chapitre) {
  // $('#'+chapitre+' video').addClass('active')
  // $('#'+chapitre+' video')[0].play()
  if (players[chapitre] && players[chapitre].playVideo) {    
    players[chapitre].playVideo()
  }
}


function stopVideo(chapitre) {
  if (players[chapitre] && players[chapitre].stopVideo) {    
    players[chapitre].stopVideo()
  }
}

function initPlayer(id) {
  var element = $("#" + id)

  $(window).on('resize', function() { resizeVideo(id) })

  return new YT.Player(id, {
    height: '100%',
    width: '100%',
    videoId: element.data('video-id'),
    playerVars: {
      autoplay: 1, 
      controls: 0,
      loop: 1,
      playlist: element.data('video-id'),
      showinfo: 0,
      modestbranding: 1,
      start: 70
    },
    events: {
      'onReady': function() {
        scrollScene()
        resizeVideo(id)
      }
    }
  });
}

function scrollScene() {
  const progress = mainScene.progress()
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
}

function resizeVideo(id) {
console.log(id)  
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