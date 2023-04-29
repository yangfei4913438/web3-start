import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode ?? 'development', process.cwd()) };

  return defineConfig({
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    server: {
      proxy: {},
    },
    plugins: [react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } })],
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'), // 映射的目录
        components: path.resolve(__dirname, 'src/components'),
        stores: path.resolve(__dirname, 'src/stores'),
      },
    },
  });
};
