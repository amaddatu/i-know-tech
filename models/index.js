const User = require('./User');
const Project = require('./Project');
const Game = require('./Game');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Project, Game };
