import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'aws-amplify': 'aws-amplify'  // No es necesario usar require aquí
    }
  }
});
