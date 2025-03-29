import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import withCssPlugin from './with-css-plugin.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config, { isServer, dev }) => {
    // Добавляем alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname),
    };
    
    return config;
  },
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "out",
  // Исключаем страницу с ошибкой из сборки
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/services': { page: '/services' },
      '/specialists': { page: '/specialists' },
      '/about': { page: '/about' },
      '/contact': { page: '/contact' }
      // Исключили /admin
    }
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

// Оборачиваем конфигурацию Next.js с помощью нашего плагина CSS
export default withCssPlugin(nextConfig);
