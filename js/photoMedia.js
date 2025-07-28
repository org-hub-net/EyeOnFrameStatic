exports.photoSlideShow = function (photoList) {
    // Inject CSS styles
    const styles = `
      .media-player {
        border: 2px solid #333;
        border-radius: 8px;
        width: 640px;
        background: #000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      .new-media-player {
        position: relative;
        width: 800px;
        max-width: 100%;
        background-color: #000;
      }
      .new-photo-frame-display {
        width: 100%;
        height: auto;
        display: block;
      }
      .new-progress-bar-container {
        position: relative;
        height: 8px;
        background: #444;
        cursor: pointer;
      }
      .controls-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
      }
      .display {
        width: 100%;
        height: 450px;
        background: #000;
        display: flex;
        justify-content: center;
        vertical-align: top;
        align-items: center;
      }
      .display img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
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
      .left-controls, .right-controls {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .control-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 1.5rem;
        margin: 0 10px;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
      }
      .control-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        color: #007bff;
        transform: scale(1.2);
      }
      .control-btn:focus {
        outline: none;
      }
      .progress-bar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        background: #222;
      }
      #progress-bar {
        width: 100%;
        margin: 10px 0;
        -webkit-appearance: none;
        appearance: none;
        height: 8px;
        border-radius: 5px;
        background: linear-gradient(to right, #0000FF 0%, #E0E0E0 0%);
        outline: none;
        transition: background 0.3s;
      }
      #progress-bar::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background-color: #0000FF;
        border-radius: 50%;
        cursor: pointer;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // get template Id
    const template = document.getElementById('media-template');
    template.innerHTML = ''; // Clear the template's content
    

  // Create HTML structure
  const container = document.createElement("div");
  container.classList.add("new-media-player");
  container.innerHTML = `
    <div id="new-photo-frame-display" class="display">
      <img id="photo-display" src="" alt="Photo" />
    </div>
    <div class="controls">
      <div class="new-progress-bar-container">
        <input id="progress-bar" type="range" min="0" max="100" value="0" />
      </div>
      <div class="controls-row">
        <div class="left-controls">
          <button id="play-pause-btn" class="new-control-btn">
            <svg id="play-icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"></path>
            </svg>
            <svg id="pause-icon" style="display: none;" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
            </svg>
          </button>
          <button class="new-control-btn" id="next-btn">
            <svg viewBox="0 0 24 24">
              <path d="M6 19l8.5-7L6 5v14zm9.5-14v14h2V5h-2z"></path>
            </svg>
          </button>
          <button class="new-control-btn" id="prev-btn">
            <svg viewBox="0 0 24 24">
              <path d="M18 19L9.5 12 18 5v14zM7.5 5v14h-2V5z"></path>
            </svg>
          </button>
        </div>
        <div class="right-controls">
          <button class="new-control-btn" id="fullscreen">
            <svg viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H7v5zm10 5h-2v3h-3v2h5v-5zm-5-5h3v2h2V5h-5v2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

// Insert slideshow into the template
  template.content.appendChild(container);
  document.body.appendChild(template.content.cloneNode(true));

    // State variables
    let currentPhotoIndex = 0;
    let isPlaying = false;
    let progress = 0;
    let elapsedTime = 0;
    let intervalId;
    const totalDuration = photoList.length * 3000; // Adjust total duration based on the photo list
    const photoDuration = 3000;
    let currentPhotoTime = 0;
  
    // Elements
    const photoDisplay = document.getElementById('photo-display');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const fullscreen = document.getElementById('fullscreen');
  
    // Helper functions
    const displayTimeInApp = (ms) => {
      const hours = Math.trunc(ms / 3600000).toString().padStart(2, "0");
      const minutes = Math.trunc((ms % 3600000) / 60000).toString().padStart(2, "0");
      const seconds = Math.trunc((ms % 60000) / 1000).toString().padStart(2, "0");
      return (hours !== "00" ? hours + ':' : '') + minutes + ':' + seconds;
    };
  
    const loadPhoto = (index) => {
      photoDisplay.src = photoList[index];
      updateDuration();
    };
  
    const updateDuration = () => {
      currentTimeEl.textContent = displayTimeInApp(elapsedTime);
      totalTimeEl.textContent = displayTimeInApp(totalDuration);
    };
  
    const updateProgress = () => {
      progress = (elapsedTime / totalDuration) * 100;
      progressBar.value = progress;
      progressBar.style.background = `linear-gradient(to right, #0000FF ${progress}%, #E0E0E0 ${progress}%)`;
    };
  
    const showPreviousPhoto = () => {
      if (elapsedTime - photoDuration - currentPhotoTime > 0) {
        elapsedTime -= (photoDuration - currentPhotoTime + 10);
        currentPhotoIndex = (currentPhotoIndex - 1 + photoList.length) % photoList.length;
      } else {
        currentPhotoIndex = 0;
        elapsedTime = 0;
      }
      loadPhoto(currentPhotoIndex);
      currentPhotoTime = 0;
      updateDuration();
      updateProgress();
    };
  
    const showNextPhoto = () => {
      currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
      elapsedTime += photoDuration - currentPhotoTime + 10;
      loadPhoto(currentPhotoIndex);
      currentPhotoTime = 0;
      updateDuration();
      updateProgress();
    };
  
    const togglePlayPause = () => {
      if (isPlaying) {
        clearInterval(intervalId);
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
      } else {
        if (elapsedTime === 0 || elapsedTime === totalDuration) {
          elapsedTime = 0;
          progress = 0;
          currentPhotoIndex = 0;
          progressBar.value = 0;
          loadPhoto(currentPhotoIndex);
        }
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
        intervalId = setInterval(() => {
          elapsedTime += 10;
          currentPhotoTime += 10;
          if (elapsedTime >= totalDuration) {
            clearInterval(intervalId);
            elapsedTime = totalDuration;
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            isPlaying = false;
          }
          if (elapsedTime % photoDuration === 10 && elapsedTime !== 10) {
            showNextPhoto();
            currentPhotoTime = 0;
          }
          updateDuration();
          updateProgress();
        }, 10);
      }
      isPlaying = !isPlaying;
    };
  
    const goFullScreen = () => {
      if (!document.fullscreenElement) {
        photoDisplay.requestFullscreen?.() || photoDisplay.webkitRequestFullscreen?.();
      } else {
        document.exitFullscreen();
      }
    };
  
    const handleProgressBarClick = (event) => {
      const rect = progressBar.getBoundingClientRect();
      const percentage = ((event.clientX - rect.left) / rect.width) * 100;
      progressBar.value = (percentage / 100) * progressBar.max;
      elapsedTime = Math.round((progressBar.value / 100) * totalDuration);
      currentPhotoIndex = Math.trunc(elapsedTime % (photoDuration * photoList.length) / photoDuration);
      currentPhotoTime = elapsedTime % (photoDuration * photoList.length) % photoDuration;
      loadPhoto(currentPhotoIndex);
      updateDuration();
      updateProgress();
    };
  
    // Event listeners
    fullscreen.addEventListener('click', goFullScreen);
    progressBar.addEventListener('click', handleProgressBarClick);
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', showPreviousPhoto);
    nextBtn.addEventListener('click', showNextPhoto);
  
    // Public API
    return {
      loadPhoto,
      togglePlayPause,
      showPreviousPhoto,
      showNextPhoto,
    };
  };
  
  // Example usage
  /*const photoList = [
    'https://via.placeholder.com/640x360/FF5733/FFFFFF?text=Photo+1',
    'https://via.placeholder.com/640x360/33FF57/FFFFFF?text=Photo+2',
    'https://via.placeholder.com/640x360/3357FF/FFFFFF?text=Photo+3',
    'https://via.placeholder.com/640x360/FF33A6/FFFFFF?text=Photo+4'
  ];
  const slideshow = photoSlideShow(photoList);
  slideshow.loadPhoto(0);
  */