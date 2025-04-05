const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware для проверки авторизации
const auth = async (req, res, next) => {
  try {
    // Получаем токен из заголовка Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    
    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Находим пользователя по id из токена
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }
    
    // Добавляем пользователя в объект запроса
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    res.status(401).json({ message: 'Пожалуйста, авторизуйтесь' });
  }
};

// Middleware для проверки роли администратора
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора' });
  }
};

// Middleware для проверки роли специалиста
const isSpecialist = (req, res, next) => {
  if (req.user && (req.user.role === 'specialist' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Доступ запрещен. Требуются права специалиста' });
  }
};

module.exports = {
  auth,
  isAdmin,
  isSpecialist
};
