import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Using a relative base ('./') means the build works whether it's served
// from https://<user>.github.io/  or  https://<user>.github.io/<repo>/
// so you don't need to hand-edit this when you rename the repo.
export default defineConfig({
  plugins: [react()],
  base: './',
});
