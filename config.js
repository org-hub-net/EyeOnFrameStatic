/*const configModule = await import(window.location.hostname !== '127.0.0.1' ? './config.prod.js' : './config.dev.js');
const config = configModule.default;

document.querySelectorAll('.cloud-images').forEach(img => {
  const filename = img.getAttribute('data-src');
  img.src = `${config.imagesBasePath}${filename}`;
});
document.querySelectorAll('.cloud-media').forEach(img => {
  const filename = img.getAttribute('data-src');
  img.src = `${config.mediaBasePath}${filename}`;
});

export default config;
*/

const configModule = await import(
  window.location.hostname !== '127.0.0.1'
    ? './config.prod.js'
    : './config.dev.js'
);
const config = configModule.default;

// Έγκυρες καταλήξεις αρχείων
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

function getExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 1).toLowerCase();
}

function isImage(ext) {
  return imageExtensions.includes(ext);
}

function isVideo(ext) {
  return videoExtensions.includes(ext);
}

// Επεξεργασία για .cloud-images
document.querySelectorAll('.cloud-images').forEach(el => {
  const filename = el.getAttribute('data-src');
  const ext = getExtension(filename);

  let src = '';
  if (isImage(ext)) {
    src = `${config.imagesBasePath}${filename}`;
  } else if (isVideo(ext)) {
    src = `${config.imagesBaseVideoPath}${filename}`;
  }

  if (el.tagName === 'IMG') {
    el.src = src;
  } else if (el.tagName === 'VIDEO') {
    el.src = src;
    el.setAttribute('controls', true);
  }
});

// Επεξεργασία για .cloud-media
document.querySelectorAll('.cloud-media').forEach(el => {
  const filename = el.getAttribute('data-src');
  const ext = getExtension(filename);

  let src = '';
  if (isVideo(ext)) {
    src = `${config.mediaBasePath}${filename}`;
  } else if (isImage(ext)) {
    src = `${config.mediaBaseImagesPath}${filename}`;
  }

  if (el.tagName === 'IMG') {
    el.src = src;
  } else if (el.tagName === 'VIDEO') {
    el.src = src;
    el.setAttribute('controls', true);
  }
});

export default config;
