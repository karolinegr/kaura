import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Com domínio próprio (ex.: seudominio.com.br) o site fica na RAIZ,
  // então o base é '/'.
  // OBS: se um dia você publicar SEM domínio, no endereço
  // karolineribeiro.github.io/kaura/, troque o base para '/kaura/'.
  base: '/',
  plugins: [react(), tailwindcss()],
})
