import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      // Exclude all storybook files from coverage
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.stories.ts',
        'src/configurations/**',
        'src/lib/**',
        'src/utils/**',
        '.storybook/**',
        'src/assets/**',
        // You can also exclude other files as needed
      ],
    },
    setupFiles: [], // Add setup files here if needed
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
}); 