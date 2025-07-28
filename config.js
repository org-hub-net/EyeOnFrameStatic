const configModule = await import(window.location.hostname !== '127.0.0.1' ? './config.prod.js' : './config.dev.js');
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