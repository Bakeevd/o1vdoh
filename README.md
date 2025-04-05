# Vdohnovenie Express

Платформа для психологического центра "Вдохновение", реализованная на стеке React + Express + MySQL.

## Структура проекта

- `frontend/` - клиентская часть на React с использованием Tailwind CSS
- `backend/` - серверная часть на Express с использованием Sequelize ORM

## Требования

- Node.js 18+ и npm
- MySQL 5.7+

## Установка и запуск

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/username/vdohnovenie-express.git
cd vdohnovenie-express
```

2. Установите зависимости:
```bash
npm install
npm run install:all
```

3. Настройте базу данных:
   - Создайте базу данных в MySQL
   - Обновите файл `backend/.env` своими настройками базы данных

4. Запустите приложение в режиме разработки:
```bash
npm run dev
```

### Установка на сервер

1. Клонируйте репозиторий:
```bash
cd /var/www/user/data/www/your-domain.com
git clone https://github.com/username/vdohnovenie-express.git .
```

2. Установите зависимости и соберите приложение:
```bash
npm install
npm run setup:prod
```

3. Настройте базу данных:
   - Создайте базу данных в MySQL
   - Обновите файл `backend/.env` своими настройками базы данных и убедитесь, что установлен `NODE_ENV=production`

4. Настройте запуск через PM2:
```bash
npm install -g pm2
pm2 start npm --name "vdohnovenie-app" -- start
pm2 save
```

5. Настройте NGINX для проксирования запросов:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Обновление на сервере

```bash
cd /var/www/user/data/www/your-domain.com
git pull
npm run setup:prod
pm2 restart vdohnovenie-app
``` 