import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GHPAGES=1 is set by the GitHub Pages workflow so the site builds against
// the /portfolio/ sub-path; local dev and root-domain deploys use '/'.
export default defineConfig({
  base: process.env.GHPAGES ? '/portfolio/' : '/',
  plugins: [react()],
})
