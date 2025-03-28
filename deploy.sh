#!/bin/bash

# Очистка кэша и временных файлов
rm -rf .next
rm -rf node_modules

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Применение миграций базы данных
npx prisma migrate deploy

# Перезапуск PM2 (если используется)
pm2 restart app.vdohnovenie.pro 