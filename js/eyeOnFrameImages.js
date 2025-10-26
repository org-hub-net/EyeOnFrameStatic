// Array of image URLs
const photoList = [
    '../media/Glasses2.png',
    '../media/OpenSeaRestaurantLight.png',
   '../media/ferry2.png'
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
  const photoDisplayImg = document.getElementById('image-photo-display');
  const playPauseBtnImg = document.getElementById('image-play-pause-btn');
  const playIconImg = document.getElementById('image-play-icon');
  const pauseIconImg = document.getElementById('image-pause-icon');
  const prevBtnImg = document.getElementById('image-prev-btn');
  const nextBtnImg = document.getElementById('image-next-btn');
  const progressBarImg = document.getElementById('image-progress-bar');
  const currentTimeElImg = document.getElementById('image-current-time');
  const totalTimeElImg = document.getElementById('image-total-time');
  const muteImg = document.getElementById('image-mute');
  const volumeLevelImg = document.getElementById('image-volume-level');
  const fullscreenImg = document.getElementById('image-fullscreen');

  // Load initial photo
  function loadPhoto(index) {
    photoDisplayImg.src = photoList[index];
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
    currentTimeElImg.textContent = currentTime;
    totalTimeElImg.textContent = totalTime;
  }
  
  // Play/Pause functionality
  function togglePlayPause() {
    
    if (isPlaying) {
      // Stop media
      clearInterval(intervalId);  // Stop progress bar update
      //clearInterval(photoSwitchInterval);  // Stop photo switching
      //playIconImg.className = 'fas fa-play';  // Change to play icon
      playIconImg.style.display = 'inline';
      pauseIconImg.style.display = 'none';

    } else {
      // Reset to the beginning
      //Tasos Added 
      playIconImg.style.display = 'none';
      pauseIconImg.style.display = 'inline';
      if(elapsedTime == 0 || elapsedTime == totalDuration){
        //Tasos Added if statement
        elapsedTime = 0;  // Reset elapsed time to 0
        progress = 0;  // Reset progress to 0
        currentPhotoIndex = 0;  // Start from the first photo
        progressBarImg.value = 0;  // Reset progress bar
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
          //playIconImg.className = 'fas fa-play'; // Change to play icon
          playIconImg.style.display = 'none';
          pauseIconImg.style.display = 'inline';
          isPlaying = false; // Stop the play state
        }
        
        if(elapsedTime % photoDuration == 10 && elapsedTime != 10){
          showNextPhoto();
          currentPhotoTime = 0;
        }

        updateDuration();
        updateProgress();

      }, 10); // Update every second

      //playIconImg.className = 'fas fa-pause';  // Change to pause icon
    }
    isPlaying = !isPlaying;
  }
  

  function updateProgress(){
    progress = (elapsedTime / totalDuration) * 100; // Calculate progress for current photo
    progressBarImg.value = progress;
    const max = progressBarImg.max; // Max value
    const percentage = progress; // Calculate percentage

    // Update the background gradient
    progressBarImg.style.background = `linear-gradient(to right, #0000FF ${percentage}%, #E0E0E0 ${percentage}%)`;
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
    
    const value = progressBarImg.value;
    const percentage = (value / progressBarImg.max) * 100;

    progressBarImg.style.background = `linear-gradient(to right, #0000FF ${percentage}%, #E0E0E0 ${percentage}%)`;
    progressBarImg.style.backgroundSize = `${percentage}% 100%`;
    // Update elapsed time
    elapsedTime.textContent = Math.round((value / 100) * totalDuration);
  }


  function getElapsedTimeFromProgressBar(event){
    console.log("click fired");
     // Get the bounding box of the progress bar
     const rect = progressBarImg.getBoundingClientRect();

     // Calculate the percentage clicked
     const clickPosition = event.clientX - rect.left; // X position within the slider
     const percentage = (clickPosition / rect.width) * 100;
 
     // Set the progress bar value
     progressBarImg.value = (percentage / 100) * progressBarImg.max;
 
     // Update the background
     progressBarImg.style.background = `linear-gradient(to right, #0000FF ${percentage}%, #E0E0E0 ${percentage}%)`;
 
     // Calculate and display elapsed time
      elapsedTime = Math.round((progressBarImg.value / 100) * totalDuration);
      currentPhotoIndex = Math.trunc(elapsedTime % (photoDuration * photoList.length) / photoDuration);
      currentPhotoTime = elapsedTime % (photoDuration * photoList.length) % photoDuration;
      loadPhoto(currentPhotoIndex);
      updateDuration();
      updateProgress();
      
  }

  // Fullscreen functionality
function goFullScreen(){
   var divElement = document.getElementById("image-photo-display");
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

const handleProgressBarClick = (event) => {
  const rect = progressBarImg.getBoundingClientRect();
  const percentage = ((event.clientX - rect.left) / rect.width) * 100;
  progressBarImg.value = (percentage / 100) * progressBarImg.max;
  elapsedTime = Math.round((progressBarImg.value / 100) * totalDuration);
  currentPhotoIndex = Math.trunc(elapsedTime % (photoDuration * photoList.length) / photoDuration);
  currentPhotoTime = elapsedTime % (photoDuration * photoList.length) % photoDuration;
  loadPhoto(currentPhotoIndex);
  updateDuration();
  updateProgress();
};

  // Event listeners
  //progressBarImg.addEventListener('input', assignElapsedTimeOnProgressbar);
  // Calculate elapsed time on click
//  fullscreenImg.addEventListener('click', goFullScreen);
// progressBarImg.addEventListener('click', getElapsedTimeFromProgressBar);
 // playPauseBtnImg.addEventListener('click', togglePlayPause);
 // prevBtnImg.addEventListener('click', showPreviousPhoto);
 // nextBtnImg.addEventListener('click', showNextPhoto);
  
  // Initial setup
//  loadPhoto(currentPhotoIndex);
  