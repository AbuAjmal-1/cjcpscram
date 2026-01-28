import { mkdirSync, cpSync, existsSync, rmSync, readdirSync } from 'fs';
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

// Copy all public files dynamically
console.log('Copying public files...');
const publicDir = join(rootDir, 'public');
const criticalFiles = ['index.html', 'sw.js', 'register-sw.js', 'index.js'];
let hasErrors = false;

if (existsSync(publicDir)) {
  const publicFiles = readdirSync(publicDir);
  let copiedCount = 0;
  publicFiles.forEach(file => {
    const src = join(publicDir, file);
    const dest = join(distDir, file);
    try {
      cpSync(src, dest, { recursive: true });
      copiedCount++;
      console.log(`  ✓ Copied ${file}`);
    } catch (err) {
      console.error(`  ✗ Failed to copy ${file}:`, err.message);
      if (criticalFiles.includes(file)) {
        hasErrors = true;
      }
    }
  });
  console.log(`Copied ${copiedCount} file(s) from public directory`);
  
  if (hasErrors) {
    console.error('\nERROR: Failed to copy critical files from public directory');
    process.exit(1);
  }
} else {
  console.error('ERROR: public directory not found!');
  process.exit(1);
}

// Copy scramjet files
console.log('Copying scramjet files...');
const scramjetSrc = join(rootDir, 'node_modules', '@mercuryworkshop', 'scramjet', 'dist');
if (existsSync(scramjetSrc)) {
  cpSync(scramjetSrc, join(distDir, 'scram'), { recursive: true });
  console.log('  ✓ Scramjet files copied');
} else {
  console.error('ERROR: Scramjet files not found at', scramjetSrc);
  console.error('The build cannot continue without scramjet. Please ensure dependencies are installed correctly.');
  process.exit(1);
}

// Copy baremux files
console.log('Copying baremux files...');
const baremuxSrc = join(rootDir, 'node_modules', '@mercuryworkshop', 'bare-mux', 'dist');
if (existsSync(baremuxSrc)) {
  cpSync(baremuxSrc, join(distDir, 'baremux'), { recursive: true });
  console.log('  ✓ Baremux files copied');
} else {
  console.error('ERROR: Baremux files not found at', baremuxSrc);
  console.error('The build cannot continue without baremux. Please ensure dependencies are installed correctly.');
  process.exit(1);
}

// Copy libcurl-transport files
console.log('Copying libcurl-transport files...');
const libcurlSrc = join(rootDir, 'node_modules', '@mercuryworkshop', 'libcurl-transport', 'dist');
if (existsSync(libcurlSrc)) {
  cpSync(libcurlSrc, join(distDir, 'libcurl'), { recursive: true });
  console.log('  ✓ Libcurl-transport files copied');
} else {
  console.error('ERROR: Libcurl-transport files not found at', libcurlSrc);
  console.error('The build cannot continue without libcurl-transport. Please ensure dependencies are installed correctly.');
  process.exit(1);
}

console.log('\n✅ Build complete! Files ready in dist/ directory');
console.log('\nNote: This build creates a static version of the frontend.');
console.log('The WebSocket proxy functionality (/wisp/) will not work on Netlify.');
console.log('For full functionality, deploy to a platform that supports WebSocket servers.');
