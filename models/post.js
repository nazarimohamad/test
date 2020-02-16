const mongoose = require('mongoose');
const user = require('./user');


const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  postImageUrl: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

postSchema.pre('remove', async function(next) {
  try {
    let user = await User.findById(this.user);
    user.Post.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

postSchema.pre('update', async function(next) {
  try {
    let user = await User.findById(this.user);
    let post = await user.Post.findById(this.id);
    if(post){
      post.name = req.body.name,
      post.description = req.body.description,
      post.price = req.body.price,
      post.postImageUrl = req.body.postImageUrl,
      post.size = req.body.size,
      post.color = req.body.color

    }
  } catch (err) {
    return next(err)
  }
})


const Post = mongoose.model("Post", postSchema);
module.exports = Post;

