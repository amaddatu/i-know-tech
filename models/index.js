const User = require('./User');
const Project = require('./Project');
const Game = require('./Game');
const Reaction = require('./Reaction');
const UserReaction = require('./UserReaction');

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


Reaction.belongsToMany(User, {
  through: {
    model: UserReaction,
    unique: false
  },
  as: 'reactions_from_user'
});
Reaction.belongsToMany(Project, {
  through: {
    model: UserReaction,
    unique: false
  },
  as: 'reactions_for_project'
});
Project.belongsToMany(Reaction, {
  through: {
    model: UserReaction,
    unique: false
  },
  as: 'project_reactions'
});
User.belongsToMany(Reaction, {
  through: {
    model: UserReaction,
    unique: false
  },
  as: 'user_reactions'
});

module.exports = { User, Project, Game, Reaction, UserReaction };
