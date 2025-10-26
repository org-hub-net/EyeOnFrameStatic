const configModule = await import(
  window.location.hostname !== '127.0.0.1'
    ? './config.prod.js'
    : './config.dev.js'
);
const config = configModule.default;

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

    // poster image (ίδιο όνομα αρχείου αλλά jpg/png thumbnail στο Cloudinary)
    const posterAttr = el.getAttribute('data-poster');
    if (posterAttr) {
      // Αν έχεις ορίσει `data-poster="thumbnail.jpg"` στο HTML
      el.poster = `${config.imagesBasePath}${posterAttr}`;
    } else {
      // default: δοκίμασε το ίδιο όνομα με .jpg
      const baseName = filename.substring(0, filename.lastIndexOf('.'));
      el.poster = `${config.imagesBasePath}${baseName}.jpg`;
    }
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

    // poster για video
    const posterAttr = el.getAttribute('data-poster');
    if (posterAttr) {
      el.poster = `${config.mediaBaseImagesPath}${posterAttr}`;
    } else {
      const baseName = filename.substring(0, filename.lastIndexOf('.'));
      el.poster = `${config.mediaBaseImagesPath}${baseName}.jpg`;
    }
  }
});

document.querySelectorAll('.vertical-align[data-video-id]').forEach(el => {
  el.addEventListener('click', () => {
    const videoId = el.getAttribute('data-video-id');
    window.location.href = `${config.baseUrl}/index.html?video=${videoId}`;
  });
});

window.config = config;
export default config;
