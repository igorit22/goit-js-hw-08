import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const currentTimeKey = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(function (event) {
    localStorage.setItem(currentTimeKey, event.seconds.toString());
  }, 1000)
);

const savedTime = localStorage.getItem(currentTimeKey) || 0;
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
