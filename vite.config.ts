import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { registrationApiPlugin } from './vite.api.ts';

export default defineConfig({
  plugins: [react(), registrationApiPlugin()],
  base: '/WebSchool/',
});
