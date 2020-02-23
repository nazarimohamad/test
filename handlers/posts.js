const db = require('../models');

// create new post
exports.createPost = async function(req, res, next) {
  try{
    let post = await db.Post.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      postImageUrl: req.body.postImageUrl,
      user: req.params.id
    })
    let foundUser = await db.User.findById(req.params.id);
    foundUser.post.push(post.id)
    let foundPost = await db.Post.findById(post._id).populate('user');
    return res.status(200).json(foundPost);
  } catch(err) {
    return next(err);
  }
};


// get specific post
exports.getPost = async function(req, res, next) {
  try {
    let foundPost = await db.Post.findById(res.params.post_id);
    return res.status(200).json(foundPost)
  } catch (err) {
    return next(err);
  }
}

// update specific post
exports.updatePost = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let foundPost = foundUser.posts.findById(req.params.post_id);
    await foundPost.update(req.body);
    let { name, description, price, postImageUrl} = foundPost;
    await foundUser.save();
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err)
  }
}


// delete specific post
exports.removePost = async function(req, res, next) {
 try {
   let foundPost = await db.Post.findById(res.params.post_id);
   await foundPost.remove();
   return res.status(200).json(foundPost)
 } catch (err) {
   return next(err);
 }
}