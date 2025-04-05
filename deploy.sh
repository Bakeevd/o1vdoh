#!/bin/bash

# Скрипт для автоматического развертывания приложения на сервере
# Запуск: ./deploy.sh [user] [domain]

# Проверка аргументов
if [ $# -lt 2 ]; then
    echo "Использование: ./deploy.sh [пользователь] [домен]"
    echo "Пример: ./deploy.sh admin78 app.vdohnovenie.pro"
    exit 1
fi

USER=$1
DOMAIN=$2
SERVER_PATH="/var/www/$USER/data/www/$DOMAIN"

echo "Начинаем развертывание приложения для домена $DOMAIN..."

# Создаем директорию, если она не существует
echo "Создание директории для приложения..."
sudo -u $USER mkdir -p $SERVER_PATH

# Клонирование репозитория или обновление существующего
echo "Обновление кода из репозитория..."
if [ -d "$SERVER_PATH/.git" ]; then
    # Если репозиторий уже существует, делаем pull
    cd $SERVER_PATH
    sudo -u $USER git pull
else
    # Если репозитория нет, клонируем его
    sudo -u $USER git clone https://github.com/username/vdohnovenie-express.git $SERVER_PATH
fi

# Устанавливаем зависимости и собираем приложение
echo "Установка зависимостей и сборка приложения..."
cd $SERVER_PATH
sudo -u $USER npm install
sudo -u $USER npm run setup:prod

# Проверяем и создаем .env файл, если его нет
if [ ! -f "$SERVER_PATH/backend/.env" ]; then
    echo "Создание .env файла из шаблона..."
    sudo -u $USER cp $SERVER_PATH/backend/.env.example $SERVER_PATH/backend/.env
    echo "ВАЖНО: Не забудьте отредактировать файл $SERVER_PATH/backend/.env и настроить подключение к базе данных!"
fi

# Настройка и перезапуск PM2
echo "Настройка PM2..."
sudo -u $USER pm2 delete $DOMAIN 2>/dev/null || true
sudo -u $USER pm2 start npm --name "$DOMAIN" -- start
sudo -u $USER pm2 save

echo "Развертывание завершено успешно."
echo "Пожалуйста, проверьте работу сайта по адресу: http://$DOMAIN"
echo ""
echo "Если сайт не работает, проверьте:"
echo "1. Настройки в файле $SERVER_PATH/backend/.env"
echo "2. Логи PM2: sudo -u $USER pm2 logs $DOMAIN"
echo "3. Настройки NGINX для домена $DOMAIN" 