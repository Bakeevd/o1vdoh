const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./models');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы для загрузок
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Маршруты API
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/service');
const specialistRoutes = require('./routes/specialist');
const bookingRoutes = require('./routes/booking');
const articleRoutes = require('./routes/article');
const reviewRoutes = require('./routes/review');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/specialists', specialistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/reviews', reviewRoutes);

// Простой маршрут для проверки
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Привет от сервера!' });
});

// Раздача статических файлов фронтенда в production
if (process.env.NODE_ENV === 'production') {
  // Статические файлы React приложения
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Любые запросы, не обработанные выше, обрабатываются React приложением
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Синхронизация с базой данных и запуск сервера
db.sequelize.sync()
  .then(() => {
    console.log('База данных синхронизирована');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Ошибка синхронизации с базой данных:', err);
  });