// videoPlayer.js
exports.createVideoPlayer = function() {

    // Apply CSS styles dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .video-container {
      position: relative;
      width: 800px;
      max-width: 100%;
      background-color: #000;
    }

    video {
      width: 100%;
      height: auto;
      display: block;
    }

    .controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .progress-container {
      position: relative;
      height: 8px;
      background: #444;
      cursor: pointer;
    }

    .progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #f00;
      width: 0%;
    }

    .controls-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      gap: 10px;
      flex-wrap: wrap;
    }

    .left-controls, .right-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .right-controls {
      margin-left: auto;
    }

    .button {
      background: none;
      border: none;
      cursor: pointer;
      color: #fff;
    }

    .button svg {
      width: 24px;
      height: 24px;
      fill: #fff;
    }

    .volume-slider {
      width: 100px;
      height: 4px;
      background: #444;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
    }

    .volume-level {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #fff;
      width: 50%;
    }

    @media (max-width: 768px) {
      .controls-row {
        flex-wrap: wrap;
      }
    }
  `;

  document.head.appendChild(style);

   // get template Id
   const template = document.getElementById('media-template');
   template.innerHTML = ''; // Clear the template's content

// Define the container for the video player
const container = document.createElement('div');
container.classList.add('video-container');

// Set the inner HTML of the container with the necessary HTML structure
container.innerHTML = `
  <video id="video" src="/media/brandurburgGate.mp4" type="video/mp4"></video>
  <div class="controls">
    <!-- Progress bar -->
    <div class="progress-container" id="progress-container">
      <div class="progress-bar" id="progress-bar"></div>
    </div>
    <!-- Controls row -->
    <div class="controls-row">
      <!-- Left section -->
      <div class="left-controls">
        <!-- Play/Pause -->
        <button class="button" id="play-pause">
          <svg id="play-icon" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"></path>
          </svg>
          <svg id="pause-icon" style="display: none;" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
          </svg>
        </button>
        <!-- Previous -->
        <button class="button" id="previous">
          <svg viewBox="0 0 24 24">
            <path d="M6 19l8.5-7L6 5v14zm9.5-14v14h2V5h-2z"></path>
          </svg>
        </button>
        <!-- Next -->
        <button class="button" id="next">
          <svg viewBox="0 0 24 24">
            <path d="M18 19L9.5 12 18 5v14zM7.5 5v14h-2V5h2z"></path>
          </svg>
        </button>
        <!-- Volume -->
        <div class="volume-container">
          <button class="button" id="mute">
            <svg id="volume-icon" viewBox="0 0 24 24">
              <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1-3.29-2.5-4.03v8.06c1.5-.73 2.5-2.25 2.5-4.03z"></path>
            </svg>
          </button>
          <div class="volume-slider" id="volume-slider">
            <div class="volume-level" id="volume-level"></div>
          </div>
        </div>
        <!-- Time -->
        <span class="time" id="time">0:00 / 0:00</span>
      </div>
      <!-- Right section -->
      <div class="right-controls">
        <!-- Subtitles -->
        <button class="button" id="subtitles">
          <svg viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z"></path>
            <path d="M7 9h5v2H7zM7 13h5v2H7zM14 9h3v2h-3zM14 13h3v2h-3z"></path>
          </svg>
        </button>
        <!-- Settings -->
        <button class="button" id="settings">
          <svg viewBox="0 0 24 24">
            <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"></path>
            <path d="M19.4 12a7.4 7.4 0 01-.6 2.6l1.6 2.1-1.9 1.9-2.1-1.6a7.4 7.4 0 01-2.6.6V20h-2v-1.6a7.4 7.4 0 01-2.6-.6l-2.1 1.6-1.9-1.9 1.6-2.1a7.4 7.4 0 01-.6-2.6H4v-2h1.6a7.4 7.4 0 01.6-2.6L4.6 7.3 6.5 5.4l2.1 1.6a7.4 7.4 0 012.6-.6V4h2v1.6a7.4 7.4 0 012.6.6l2.1-1.6 1.9 1.9-1.6 2.1a7.4 7.4 0 01.6 2.6H20v2h-1.6z"></path>
          </svg>
        </button>
        <!-- Fullscreen -->
        <button class="button" id="fullscreen">
          <svg viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H7v5zm10 5h-2v3h-3v2h5v-5zm-5-5h3v2h2V5h-5v2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
`;

// Append the video container to the template
  template.content.appendChild(container);
  document.body.appendChild(template.content.cloneNode(true));


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
  
    // Play/Pause functionality
    playPause.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
      } else {
        video.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      }
    });
  
    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${progress}%`;
      const currentTime = formatTime(video.currentTime);
      const duration = formatTime(video.duration);
      time.textContent = `${currentTime} / ${duration}`;
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
      muteBtn.innerHTML = video.muted ? `
      <svg id="volume-icon" viewBox="0 0 24 24">
        <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1-3.29-2.5-4.03v8.06c1.5-.73 2.5-2.25 2.5-4.03z"></path>
      </svg>
    ` : `
      <svg id="volume-icon" viewBox="0 0 24 24">
        <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1-3.29-2.5-4.03v8.06c1.5-.73 2.5-2.25 2.5-4.03z"></path>
      </svg>
    `;
    });

     // Format time as mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsFormatted = Math.floor(seconds % 60);
    return `${minutes}:${secondsFormatted < 10 ? '0' : ''}${secondsFormatted}`;
  }
  
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
  }
  