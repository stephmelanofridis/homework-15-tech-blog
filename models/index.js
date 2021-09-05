const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    as: 'posts'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'poster'
});

Post.hasMany(Comment, {
    foreignKey: 'id',
    as: 'comment'
});

Comment.belongsTo(Post, {
    foreignKey: 'user_id',
    as: 'post comment'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'commentor'
});

module.exports = { User, Post, Comment }