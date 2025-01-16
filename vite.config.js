import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '.',
  define: {
    // Ensure proper handling of environment variables
    'process.env': {}
  }
})
