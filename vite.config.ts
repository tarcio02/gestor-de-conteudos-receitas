import { defineConfig } from 'vite'

const SCRIPT_EXEC =
  'https://script.google.com/macros/s/AKfycbyJEJ4W4YJ1oiYOXPMR_XGJMn1jubkz7ms2LYPCJSflWpKrLl1Cbx7oE_td82GeCJo/exec'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: SCRIPT_EXEC,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
