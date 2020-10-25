// Update DOM
function loadSong(song, selElements) {
   selElements.title.textContent = song.displayName;
   selElements.artist.textContent = song.artist;
   selElements.music.src = `./music/${song.name}.mp3`;
   selElements.img.src = `./img/${song.name}.jpg`;
}

// Play
function playSong(selElements, playerState) {
   playerState.isPlaying = true;
   selElements.playBtn.classList.replace('fa-play', 'fa-pause');
   selElements.playBtn.setAttribute('title', 'Pause');
   selElements.music.play();
}

// Paues
function pauseSong(selElements, playerState) {
   playerState.isPlaying = false;
   selElements.playBtn.classList.replace('fa-pause', 'fa-play');
   selElements.playBtn.setAttribute('title', 'Play');
   selElements.music.pause();
}

// next or prev song
function switchSong(next, selElements, playerState) {
   if(next) {
      playerState.songidx++;
      if (playerState.songidx >= playerState.songs.length) {
         playerState.songidx = 0;
      }
   } else {
      playerState.songidx--;
      if(playerState.songidx < 0) {
         playerState.songidx = playerState.songs.length - 1;
      }
   }
   loadSong(playerState.songs[playerState.songidx], selElements);
   // playerState.isPlaying ? playSong(selElements, playerState) : pauseSong(selElements, playerState);
   
   // would play song after loading
   playSong(selElements, playerState);
}

// Update progress bar and time
function updateProgressBar(selElements, playerState, event) {
   if(playerState.isPlaying) {
      const { duration, currentTime } = event.srcElement;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      selElements.progress.style.width = `${progressPercent}%`;

      // Calculate display for duration
      const durationMin = Math.floor(duration / 60);
      let durationSec = Math.floor(duration % 60);
      if(durationSec < 10) {
         durationSec = `0${durationSec}`;
      }
      
      // Delay switching duration Element to avoid NaN
      if(durationSec) {
         selElements.durationEl.textContent = `${durationMin}:${durationSec}`;
      }

      // Calculate display for current
      const currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if(currentSec < 10) {
         currentSec = `0${currentSec}`;
      }
      selElements.currentTimeEl.textContent = `${currentMin}:${currentSec}`;

      // Next song when finished not using eventlistener
      // if(durationMin === currentMin && durationSec === currentSec) {
      //    switchSong(true);
      // }
   }
}

// Update progress bar
function setProgressBar(selElements, event) {
   const barWidth = selElements.progressContainer.clientWidth;
   const clickX =  event.offsetX;
   const {duration} = selElements.music;
   selElements.music.currentTime = (clickX / barWidth) * duration;
}

// initialize player
function initPlayer(selElements, playerState) {
   // Load first song
   loadSong(playerState.songs[playerState.songidx], selElements);
   // Event listeners
   selElements.playBtn.addEventListener('click', () => (playerState.isPlaying ? pauseSong(selElements, playerState) : playSong(selElements, playerState)));
   selElements.prevBtn.addEventListener('click', () => switchSong(false, selElements, playerState));
   selElements.nextBtn.addEventListener('click', () => switchSong(true, selElements, playerState));
   selElements.music.addEventListener('timeupdate', event => updateProgressBar(selElements, playerState, event));
   selElements.music.addEventListener('ended', () => switchSong(true, selElements, playerState));
   selElements.progressContainer.addEventListener('click', event => setProgressBar(selElements, event));
}

function main() {
   // Object for all element selectors
   const selElements = {
      img : document.querySelector('img'),
      title : document.getElementById('title'),
      artist : document.getElementById('artist'),
      music : document.querySelector('audio'),
      progressContainer : document.getElementById('progress-container'),
      progress : document.getElementById('progress'),
      currentTimeEl : document.getElementById('current-time'),
      durationEl : document.getElementById('duration'),
      prevBtn : document.getElementById('prev'),
      playBtn : document.getElementById('play'),
      nextBtn : document.getElementById('next')
   }
   // Lock element selelctors object
   Object.freeze(selElements);
   
   // music player states
   const playerState = {
      // Current song
      songidx : 0,
      // Check if playing
      isPlaying : false,
      // Song
      songs : [
         {
            name: 'jacinto-1',
            displayName: 'Electric Chill Machine',
            artist: 'Jacinto Design'
         }, 
         {
            name: 'jacinto-2',
            displayName: 'Seven Nation Army (Remix)',
            artist: 'Jacinto Design'
         }, 
         {
            name: 'jacinto-3',
            displayName: 'Goodnight, Disco Queen',
            artist: 'Jacinto Design'
         }, 
         {
            name: 'metric-1',
            displayName: 'Front Row',
            artist: 'Metric/Jacinto Design'
         }
      ]
   }
   // init player
   initPlayer(selElements, playerState);
}

main();