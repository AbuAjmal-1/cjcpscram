import { mkdirSync, cpSync, existsSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('Building for Netlify deployment...');

// Clean dist directory
const distDir = join(rootDir, 'dist');
if (existsSync(distDir)) {
  console.log('Cleaning dist directory...');
  rmSync(distDir, { recursive: true });
}

// Create dist directory structure
console.log('Creating dist directory structure...');
mkdirSync(distDir, { recursive: true });
mkdirSync(join(distDir, 'scram'), { recursive: true });
mkdirSync(join(distDir, 'baremux'), { recursive: true });
mkdirSync(join(distDir, 'libcurl'), { recursive: true });

// Copy public files
console.log('Copying public files...');
const publicDir = join(rootDir, 'public');
const files = ['404.html', 'config.js', 'credits.html', 'favicon.ico', 'index.css', 'index.html', 'index.js', 'register-sw.js', 'search.js', 'sj.png', 'sw.js', '_headers'];
files.forEach(file => {
  const src = join(publicDir, file);
  const dest = join(distDir, file);
  if (existsSync(src)) {
    cpSync(src, dest);
  }
});

// Copy scramjet files
console.log('Copying scramjet files...');
const scramjetSrc = join(rootDir, 'node_modules', '@mercuryworkshop', 'scramjet', 'dist');
if (existsSync(scramjetSrc)) {
  cpSync(scramjetSrc, join(distDir, 'scram'), { recursive: true });
} else {
  console.warn('Warning: Scramjet files not found at', scramjetSrc);
}

// Copy baremux files
console.log('Copying baremux files...');
const baremuxSrc = join(rootDir, 'node_modules', '@mercuryworkshop', 'bare-mux', 'dist');
if (existsSync(baremuxSrc)) {
  cpSync(baremuxSrc, join(distDir, 'baremux'), { recursive: true });
} else {
  console.warn('Warning: Baremux files not found at', baremuxSrc);
}

// Copy libcurl-transport files
console.log('Copying libcurl-transport files...');
const libcurlSrc = join(rootDir, 'node_modules', '@mercuryworkshop', 'libcurl-transport', 'dist');
if (existsSync(libcurlSrc)) {
  cpSync(libcurlSrc, join(distDir, 'libcurl'), { recursive: true });
} else {
  console.warn('Warning: Libcurl-transport files not found at', libcurlSrc);
}

console.log('Build complete! Files ready in dist/ directory');
console.log('\nNote: This build creates a static version of the frontend.');
console.log('The WebSocket proxy functionality (/wisp/) will not work on Netlify.');
console.log('For full functionality, deploy to a platform that supports WebSocket servers.');
