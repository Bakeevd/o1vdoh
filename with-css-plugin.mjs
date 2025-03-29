// with-css-plugin.mjs
// ESM формат для совместимости с next.config.mjs

// Примечание: MiniCssExtractPlugin будет импортирован динамически внутри функции
import path from 'path';

export default function withCssPlugin(nextConfig = {}) {
  return {
    ...nextConfig,
    webpack: (config, options) => {
      const { isServer, dev } = options;
      
      // Добавляем плагин только для клиентских сборок в production
      if (!isServer && !dev) {
        try {
          // Динамический импорт для избежания проблем с ESM/CommonJS
          // eslint-disable-next-line import/no-extraneous-dependencies
          const MiniCssExtractPlugin = require('mini-css-extract-plugin');
          
          // Проверяем, есть ли уже плагин
          const hasPlugin = config.plugins.some(
            (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
          );
          
          if (!hasPlugin) {
            config.plugins.push(
              new MiniCssExtractPlugin({
                filename: 'static/css/[contenthash].css',
                chunkFilename: 'static/css/[contenthash].css',
                ignoreOrder: true,
              })
            );
          }
        } catch (e) {
          console.warn('Error setting up MiniCssExtractPlugin:', e);
        }
      }
      
      // Вызываем оригинальный webpack метод, если он есть
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      
      return config;
    },
  };
}; 