import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3010,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@/configurations",
        replacement: path.resolve(__dirname, "./src/configurations"),
      },
      {
        find: "@/components/atoms",
        replacement: path.resolve(__dirname, "./src/components/atoms"),
      },
      {
        find: "@/utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
    ],
  },
})
