const sequelize = require('../config/connection');
const { User, Project, Reaction, UserReaction } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const reactionData = require('./reactionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const reactions = await Reaction.bulkCreate(reactionData, {
    individualHooks: true,
    returning: true,
  });

  let count = 0;
  for (const project of projectData) {
    const projectData = await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    
    if(count < 1){
      count++;
      // project id only exists within this for loop
      const project_id = projectData.id;
      const user_id = users[Math.floor(Math.random() * users.length)].id; 
      const reaction_id = reactions[Math.floor(Math.random() * reactions.length)].id; 
      await UserReaction.create({
        project_id, user_id, reaction_id
      });
    }
  }

  // cant react here -- 
};

module.exports = seedDatabase;
