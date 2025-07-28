const { photoSlideShow } = require('./photoMedia.js');
const { createVideoPlayer } = require('./videoPlayer.js');


document.addEventListener('DOMContentLoaded', () => {
  const contentType = determineContentType(); // Replace this with your logic

  if (contentType === 'photo') {
    //createPhotoSlideshow();
    const photoList = [
      'https://via.placeholder.com/640x360/FF5733/FFFFFF?text=Photo+1',
      'https://via.placeholder.com/640x360/33FF57/FFFFFF?text=Photo+2',
      'https://via.placeholder.com/640x360/3357FF/FFFFFF?text=Photo+3',
      'https://via.placeholder.com/640x360/FF33A6/FFFFFF?text=Photo+4'
    ];
    const slideshow = photoSlideShow(photoList);
    slideshow.loadPhoto(0);
  } else if (contentType === 'video') {
    createVideoPlayer();
  }
});

function determineContentType() {
  // Replace this with your logic to determine whether to show photos or videos
  // For example, you could fetch from an API or use a predefined setting
  return 'photo'; // Example: return 'video' to display a video player
}


document.querySelectorAll('.mini .area img').forEach((img) => {
  img.onload = function () {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const container = img.parentElement;

      if (aspectRatio > 1) {
          // Landscape
          img.style.width = "100%";
          img.style.height = "auto";
      } else {
          // Portrait
          img.style.width = "auto";
          img.style.height = "100%";
      }
  };
});
