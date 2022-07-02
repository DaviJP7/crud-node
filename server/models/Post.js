const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    img: String,
    content: String
});

module.exports = Post;

