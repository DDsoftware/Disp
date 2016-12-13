var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize) => {
  var User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    producPurchase: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: false,
      },
    },
    balance: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: 0,
      validate: {
        notEmpty: false,
      },
    },
    cardNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1234567890,
      validate: {
        notEmpty: false,
      },
    },
  });

  User.beforeCreate((user) =>
    new sequelize.Promise((resolve) => {
      bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
        resolve(hashedPassword);
      });
    }).then((hashedPw) => {
      user.password = hashedPw;
    })
  );

  return User;
};
