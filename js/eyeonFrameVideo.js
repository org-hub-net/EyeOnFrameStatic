const video = document.getElementById('video');
const playPause = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const mute = document.getElementById('mute');
const volumeLevel = document.getElementById('volume-level');
const volumeSlider = document.getElementById('volume-slider');
const time = document.getElementById('time');
const subtitles = document.getElementById('subtitles');
const settings = document.getElementById('settings');
const fullscreen = document.getElementById('fullscreen');
const overlay = document.getElementById('overlay');
const fullscreenBtn = document.getElementById('fullscreen');

video.removeAttribute('controls');
video.controls = false;


// Helper: Format time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

// Play/Pause button
playPause.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

// When video pauses (any reason)

video.addEventListener('pause', () => {
  //overlay.style.display = 'flex';
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
});


// When video plays
video.addEventListener('play', () => {
  overlay.style.display = 'none';
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
});


const showCreator = document.getElementById('showCreator');

showCreator.addEventListener('click', () => {
  if(overlay.style.display === 'none'){
  video.pause();
  overlay.style.display = 'flex';
  playIcon.style.display = 'inline';
  }else{
    overlay.style.display = 'none';
  }

});



video.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (!video.paused) {
    video.pause();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'inline';
  }
  overlay.style.display = 'flex';
});



video.addEventListener('ended', () => {
  overlay.style.display = 'flex';
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
});

// Click on overlay (outside of links/images) → Resume
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
    //video.play();
  }
    if (!e.target.closest('a')) {
    overlay.style.display = 'none';
  }
  console.log('Clicked element:', e.target);
});

// Update progress bar
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progress}%`;
  const currentTime = formatTime(video.currentTime);
  const duration = formatTime(video.duration);
  time.textContent = `${currentTime} / ${duration}`;
});

// Seek on progress click
progressContainer.addEventListener('click', (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = progressContainer.offsetWidth;
  const newTime = (clickX / width) * video.duration;
  video.currentTime = newTime;
});

// Mute/unmute
mute.addEventListener('click', () => {
  video.muted = !video.muted;
  volumeLevel.style.width = video.muted ? '0%' : `${video.volume * 100}%`;
});

// Adjust volume
volumeSlider.addEventListener('click', (e) => {
  const rect = volumeSlider.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = volumeSlider.offsetWidth;
  const newVolume = clickX / width;
  video.volume = newVolume;
  volumeLevel.style.width = `${newVolume * 100}%`;
  video.muted = false;
});

// Previous/Next buttons
previous.addEventListener('click', () => {
  console.log('Previous video');
});
next.addEventListener('click', () => {
  console.log('Next video');
});


/*
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    // Ζητάμε fullscreen για το στοιχείο video
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Safari
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen(); // IE/Edge
    }
  } else {
    // Αν είναι ήδη fullscreen, κάνε έξοδο
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE/Edge
    }
  }
});
*/

document.getElementById('fullscreen').addEventListener('click', () => {
  const video = document.getElementById('video');
  goFullscreen(video);
});


function goFullscreen(videoElement) {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitEnterFullscreen) {
    // iOS Safari
    videoElement.webkitEnterFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    // Older WebKit
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.msRequestFullscreen) {
    videoElement.msRequestFullscreen();
  } else {
    console.warn('Fullscreen not supported');
  }
}


