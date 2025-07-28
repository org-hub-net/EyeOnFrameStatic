// Array of image URLs
const photoList = [
    'https://i1.prth.gr/images/1299x674/png/files/2025-01-03/kifissosmaketa.webp',
    'https://via.placeholder.com/640x360/FF5733/FFFFFF?text=Photo+1',
    'https://via.placeholder.com/640x360/33FF57/FFFFFF?text=Photo+2',
    'https://via.placeholder.com/640x360/3357FF/FFFFFF?text=Photo+3',
    'https://via.placeholder.com/640x360/FF33A6/FFFFFF?text=Photo+4'
  ];
  
  // State variables
  let currentPhotoIndex = 0;
  let isPlaying = false;
  let progress = 0; // Progress bar value (0 - 100)
  let elapsedTime = 0; // Time counter (in seconds)
  let intervalId;
  let photoSwitchInterval;
  const totalDuration = 120000; // Total time for all photos (12 seconds)
  const photoDuration = 3000; // 3 seconds per photo
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
  const mute = document.getElementById('mute');
  const volumeLevel = document.getElementById('volume-level');
  const fullscreen = document.getElementById('fullscreen');
  
  // Load initial photo
  function loadPhoto(index) {
    photoDisplay.src = photoList[index];
    updateDuration();
  }
  
  function displayTimeInApp(ms){

    //Add Hours
    let hoursT = Math.trunc(ms/3600000);
    let hoursStr = Math.trunc(ms/3600000).toString().padStart(2, "0");

    let mins = Math.trunc(Math.trunc((ms/1000 - hoursT * 3600)/60) % 60);
    let minstr = mins.toString().padStart(2, "0");

    let secs = Math.trunc(Math.trunc(ms/1000 - hoursT * 3600 - mins * 60)) % 60;
    let secstr = secs.toString().padStart(2, "0");
    let totalTimeDisplay = (hoursStr != "00" ? hoursStr + ':' : "") + minstr + ':' + secstr;

    return totalTimeDisplay;

  }

  // Update duration display (current time and total time)
  function updateDuration() {

    var currentTime = displayTimeInApp(elapsedTime);
    var totalTime = displayTimeInApp(totalDuration);
    currentTimeEl.textContent = currentTime;
    totalTimeEl.textContent = totalTime;
  }
  
  // Play/Pause functionality
  function togglePlayPause() {
    
    if (isPlaying) {
      // Stop media
      clearInterval(intervalId);  // Stop progress bar update
      //clearInterval(photoSwitchInterval);  // Stop photo switching
      //playIcon.className = 'fas fa-play';  // Change to play icon
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';

    } else {
      // Reset to the beginning
      //Tasos Added 
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
      if(elapsedTime == 0 || elapsedTime == totalDuration){
        //Tasos Added if statement
        elapsedTime = 0;  // Reset elapsed time to 0
        progress = 0;  // Reset progress to 0
        currentPhotoIndex = 0;  // Start from the first photo
        progressBar.value = 0;  // Reset progress bar
      }
    
      // all added by Tasos
      loadPhoto(currentPhotoIndex);  // Load the first photo
      
      // Start or resume the interval for progress bar and elapsed time
      intervalId = setInterval(() => {
        // Increment elapsed time in seconds
        elapsedTime += 10;
        currentPhotoTime = currentPhotoTime + 10;
       
        // If elapsed time reaches 12 seconds, stop and ensure it doesn't exceed total duration
        if (elapsedTime >= totalDuration) {
          //Commented by Tasos
          clearInterval(intervalId); // Stop progress bar update
          elapsedTime = totalDuration; // Ensure it doesn't exceed total duration
          //clearInterval(photoSwitchInterval); // Stop photo switching
          //playIcon.className = 'fas fa-play'; // Change to play icon
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'inline';
          isPlaying = false; // Stop the play state
        }
        
        if(elapsedTime % photoDuration == 10 && elapsedTime != 10){
          showNextPhoto();
          currentPhotoTime = 0;
        }

        updateDuration();
        updateProgress();

      }, 10); // Update every second

      //playIcon.className = 'fas fa-pause';  // Change to pause icon
    }
    isPlaying = !isPlaying;
  }
  

  function updateProgress(){
    progress = (elapsedTime / totalDuration) * 100; // Calculate progress for current photo
    progressBar.value = progress;
    const max = progressBar.max; // Max value
    const percentage = progress; // Calculate percentage

    // Update the background gradient
    progressBar.style.background = `linear-gradient(to right, #0000FF ${percentage}%, #E0E0E0 ${percentage}%)`;
  }

  // Navigate to the previous photo
  function showPreviousPhoto() {

    if(elapsedTime - photoDuration - currentPhotoTime > 0){
      elapsedTime = elapsedTime - photoDuration - currentPhotoTime + 10;
      currentPhotoIndex = (currentPhotoIndex - 1 + photoList.length) % photoList.length;
    }else{
      currentPhotoIndex = 0;
      elapsedTime = 0;
    }

    
    loadPhoto(currentPhotoIndex);
  
    // Reset progress bar to 0% when going to the previous photo
    
    currentPhotoTime = 0;
    updateDuration();
    updateProgress(); // Update time display
  }
  
  // Navigate to the next photo
  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
    elapsedTime = elapsedTime + photoDuration - currentPhotoTime + 10;
    loadPhoto(currentPhotoIndex);
    currentPhotoTime = 0;
    updateDuration();
    updateProgress();
  }

  function assignElapsedTimeOnProgressbar(){
    
    const value = progressBar.value;
    const percentage = (value / progressBar.max) * 100;

    progressBar.style.background = `linear-gradient(to right, #0000FF ${percentage}%, #E0E0E0 ${percentage}%)`;

    // Update elapsed time
    elapsedTime.textContent = Math.round((value / 100) * totalDuration);
  }
  

  function getElapsedTimeFromProgressBar(){
     // Get the bounding box of the progress bar
     const rect = progressBar.getBoundingClientRect();

     // Calculate the percentage clicked
     const clickPosition = event.clientX - rect.left; // X position within the slider
     const percentage = (clickPosition / rect.width) * 100;
 
     // Set the progress bar value
     progressBar.value = (percentage / 100) * progressBar.max;
 
     // Update the background
     progressBar.style.background = `linear-gradient(to right, #0000FF ${percentage}%, #E0E0E0 ${percentage}%)`;
 
     // Calculate and display elapsed time
      elapsedTime = Math.round((progressBar.value / 100) * totalDuration);
      currentPhotoIndex = Math.trunc(elapsedTime % (photoDuration * photoList.length) / photoDuration);
      currentPhotoTime = elapsedTime % (photoDuration * photoList.length) % photoDuration;
      loadPhoto(currentPhotoIndex);
      updateDuration();
      updateProgress();
      
  }

  // Fullscreen functionality
function goFullScreen(){
   var divElement = document.getElementById("photo-display");
    if (!document.fullscreenElement) {
      if (divElement.requestFullscreen) {
        divElement.requestFullscreen();
        } else if (divElement.webkitRequestFullscreen) { // Safari
            divElement.webkitRequestFullscreen();
        } else if (divElement.mozRequestFullScreen) { // Firefox
            divElement.mozRequestFullScreen();
        } else if (divElement.msRequestFullscreen) { // IE/Edge
            divElement.msRequestFullscreen();
    } else {
        console.log("Fullscreen API is not supported in this browser.");
    }
  }else {
  document.exitFullscreen();
}
};


  // Event listeners
  //progressBar.addEventListener('input', assignElapsedTimeOnProgressbar);
  // Calculate elapsed time on click
  fullscreen.addEventListener('click', goFullScreen);
  progressBar.addEventListener('click', getElapsedTimeFromProgressBar);
  playPauseBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', showPreviousPhoto);
  nextBtn.addEventListener('click', showNextPhoto);
  
  // Initial setup
  loadPhoto(currentPhotoIndex);
  