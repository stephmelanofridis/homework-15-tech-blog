const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true, });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await post.bulkCreate({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].isSoftDeleted,
        });

        process.exit(0);
    };

    seedDatabase();
}