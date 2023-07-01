const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserReaction extends Model {}

UserReaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    reaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reaction',
        key: 'id',
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_reaction',
  }
);

module.exports = UserReaction;
