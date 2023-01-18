import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;700&display=swap'
    ])
  ]
})
