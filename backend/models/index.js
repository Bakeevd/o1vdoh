const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Модели
db.User = require('./user')(sequelize, Sequelize);
db.Specialist = require('./specialist')(sequelize, Sequelize);
db.Service = require('./service')(sequelize, Sequelize);
db.Booking = require('./booking')(sequelize, Sequelize);
db.Article = require('./article')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.Favorite = require('./favorite')(sequelize, Sequelize);

// Связи
db.User.hasOne(db.Specialist);
db.Specialist.belongsTo(db.User);

db.Specialist.hasMany(db.Service);
db.Service.belongsTo(db.Specialist);

db.User.hasMany(db.Booking);
db.Booking.belongsTo(db.User);

db.Service.hasMany(db.Booking);
db.Booking.belongsTo(db.Service);

db.Specialist.hasMany(db.Booking);
db.Booking.belongsTo(db.Specialist);

db.Specialist.hasMany(db.Article);
db.Article.belongsTo(db.Specialist);

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Service.hasMany(db.Review);
db.Review.belongsTo(db.Service);

db.User.hasMany(db.Favorite);
db.Favorite.belongsTo(db.User);

db.Service.hasMany(db.Favorite);
db.Favorite.belongsTo(db.Service);

module.exports = db;