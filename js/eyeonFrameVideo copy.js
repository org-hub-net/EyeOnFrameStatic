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


// Παύση μέσω κουμπιού
playPause.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    overlay.style.display = 'none';
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
  } else {
    video.pause();
    overlay.style.display = 'flex';
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  }
});

// Παίξε / Παύση μέσω κουμπιού
playPause.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

// Όταν το βίντεο μπαίνει σε παύση (από οπουδήποτε)
video.addEventListener('pause', () => {
  overlay.style.display = 'flex';
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
});

// Όταν το βίντεο παίζει
video.addEventListener('play', () => {
  overlay.style.display = 'none';
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
});




// Δεξί κλικ πάνω στο βίντεο → Παύση + Overlay
video.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (!video.paused) {
    video.pause();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  }
  overlay.style.display = 'flex';
});


// Seek video when clicking on progress bar
progressContainer.addEventListener('click', (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = progressContainer.offsetWidth;
  const newTime = (clickX / width) * video.duration;
  video.currentTime = newTime;
});

// Format time helper
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

// Previous button functionality
previous.addEventListener('click', () => {
  console.log('Go to the previous video');
  // Add logic to switch to the previous video
});

// Next button functionality
next.addEventListener('click', () => {
  console.log('Go to the next video');
  // Add logic to switch to the next video
});

// Mute/unmute functionality
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



// Click μόνο στο κενό μέρος του overlay → Παίζει ξανά
overlay.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    overlay.style.display = 'none';
    video.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
  }
});




