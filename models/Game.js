const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    latitude: {
      // max 150???
      type: DataTypes.DECIMAL(7,3),
    },
    longitude: {
      type: DataTypes.DECIMAL(7,3),
    },
    card0: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card4: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card5: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card6: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    card7: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game',
  }
);

module.exports = Game;
