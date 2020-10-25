class MusicPlayer {
   constructor() {
      this.img = document.querySelector('img');
      this.title = document.getElementById('title');
      this.artist = document.getElementById('artist');
      this.music = document.querySelector('audio');
      this.progressContainer = document.getElementById('progress-container');
      this.progress = document.getElementById('progress');
      this.currentTimeEl = document.getElementById('current-time');
      this.durationEl = document.getElementById('duration');
      this.prevBtn = document.getElementById('prev');
      this.playBtn = document.getElementById('play');
      this.nextBtn = document.getElementById('next');

      // Current song
      this.songidx = 0;
      
      // Check if playing
      this.isPlaying = false;

      // Song
      this.songs = [
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

      // run init
      this.init();
   }

   init() {
      // Load first song
      this.loadSong(this.songs[this.songidx]);
      // Event listeners
      this.playBtn.addEventListener('click', () => (this.isPlaying ? this.pauseSong() : this.playSong()));
      this.prevBtn.addEventListener('click', () => this.switchSong(false));
      this.nextBtn.addEventListener('click', () => this.switchSong(true));
      this.music.addEventListener('timeupdate', this.updateProgressBar.bind(this));
      this.music.addEventListener('ended', () => this.switchSong(true));
      this.progressContainer.addEventListener('click', this.setProgressBar.bind(this));
   }

   // Play
   playSong() {
      this.isPlaying = true;
      this.playBtn.classList.replace('fa-play', 'fa-pause');
      this.playBtn.setAttribute('title', 'Pause');
      this.music.play();
   }

   // Paues
   pauseSong() {
      this.isPlaying = false;
      this.playBtn.classList.replace('fa-pause', 'fa-play');
      this.playBtn.setAttribute('title', 'Play');
      this.music.pause();
   }

   // Update DOM
   loadSong(song) {
      this.title.textContent = song.displayName;
      this.artist.textContent = song.artist;
      this.music.src = `./music/${song.name}.mp3`;
      this.img.src = `./img/${song.name}.jpg`;
   }

   // next or prev song
   switchSong(next) {
      if(next) {
         this.songidx++;
         if (this.songidx >= this.songs.length) {
            this.songidx = 0;
         }
      } else {
         this.songidx--;
         if(this.songidx < 0) {
            this.songidx = this.songs.length - 1;
         }
      }
      this.loadSong(this.songs[this.songidx]);
      this.isPlaying ? this.playSong() : this.pauseSong();
   }

   // Update progress bar and time
   updateProgressBar(event) {
      if(this.isPlaying) {
         const { duration, currentTime } = event.srcElement;
         // Update progress bar width
         const progressPercent = (currentTime / duration) * 100;
         this.progress.style.width = `${progressPercent}%`;

         // Calculate display for duration
         const durationMin = Math.floor(duration / 60);
         let durationSec = Math.floor(duration % 60);
         if(durationSec < 10) {
            durationSec = `0${durationSec}`;
         }
         
         // Delay switching duration Element to avoid NaN
         if(durationSec) {
            this.durationEl.textContent = `${durationMin}:${durationSec}`;
         }

         // Calculate display for current
         const currentMin = Math.floor(currentTime / 60);
         let currentSec = Math.floor(currentTime % 60);
         if(currentSec < 10) {
            currentSec = `0${currentSec}`;
         }
         this.currentTimeEl.textContent = `${currentMin}:${currentSec}`;

         // Next song when finished not using eventlistener
         // if(durationMin === currentMin && durationSec === currentSec) {
         //    this.switchSong(true);
         // }
      }
   }

   // Update progress bar
   setProgressBar(event) {
      const barWidth = this.progressContainer.clientWidth;
      const clickX =  event.offsetX;
      const {duration} = this.music;
      this.music.currentTime = (clickX / barWidth) * duration;
   }
}


function main() {
   mp = new MusicPlayer;
}

main();