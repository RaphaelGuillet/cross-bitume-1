import 'babel-polyfill'
import './main.scss'

import MobileDetect from 'mobile-detect'

const mobileDetect = new MobileDetect(window.navigator.userAgent)

const players = {}

window.onYouTubeIframeAPIReady = () => {
  for (let ytplayer of document.querySelectorAll('.youtube-player')) {
    players[ytplayer.id] = new YT.Player(ytplayer.id, {
      videoId: ytplayer.dataset.videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        showinfo: 0,
        modestbranding: 1,
        playlist: ytplayer.dataset.videoId,
        rel: 0
      },
      events: {
        'onReady': event => {
          if (mobileDetect.mobile()) {
            event.target.mute()
          }

          if (ytplayer.id === 'video0') {
            event.target.playVideo()
          }
        }
      }
    })
  }
}

function onScroll () {
  const currentScroll = window.scrollY

  let video2play = null

  for (const section of document.querySelectorAll('section')) {
    const figure = section.querySelector('figure')

    if (section.offsetTop < currentScroll && (section.offsetTop + section.offsetHeight) > currentScroll) {
      section.classList.add('fixed')
    } else {
      section.classList.remove('fixed')
    }

    const iframe = figure.querySelector('iframe')

    if (iframe && iframe.id && players[iframe.id]) {
      if ((section.offsetTop - currentScroll) < window.innerHeight && (section.offsetTop + section.offsetHeight) > currentScroll) {
        video2play = iframe.id
      }
    }
  }

  for (const player in players) {
    if (player !== video2play) {
      players[player].stopVideo()
    } else {
      players[player].playVideo()
    }
  }
}

window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('touchmove', onScroll)
