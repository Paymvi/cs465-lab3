
// Credit to AI for teaching me that this is necessary for Vitest to understand JSX

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // needed to test React components
    setupFiles: './vitest.setup.js', // optional for custom setup
  },
});
