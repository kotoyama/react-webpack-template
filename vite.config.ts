import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { checker } from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const aliases = [
    {
      find: /~/,
      replacement: path.resolve(__dirname, './src'),
    },
  ]

  if (mode === 'test') {
    aliases.push({
      find: /^effector-react$/,
      replacement: 'effector-react/scope',
    })
  }

  return {
    server: {
      port: 3000,
    },
    plugins: [
      react({
        babel: {
          plugins: [['effector/babel-plugin', { addLoc: true }]],
        },
      }),
      splitVendorChunkPlugin(),
      checker({ typescript: true }),
      stylelint({ fix: true }),
      eslint({ fix: true }),
      svgr(),
    ],
    resolve: {
      alias: aliases,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  }
})
