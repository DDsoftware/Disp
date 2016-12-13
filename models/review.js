const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('review', {
    productName: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
    slug: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Review;
};
