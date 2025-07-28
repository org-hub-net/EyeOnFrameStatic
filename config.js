// Ανάλογα με κάποιο flag
const isProd = window.location.hostname !== 'localhost';

// Φόρτωσε δυναμικά το σωστό config
const config = isProd
  ? await import('./config.prod.js').then(mod => mod.default)
  : await import('./config.dev.js').then(mod => mod.default);

export default config;