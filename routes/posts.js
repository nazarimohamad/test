const express = require('express');
const router = express.Router({mergeParams: true});
const { createPost, getPost, updatePost, removePost } = require('../handlers/posts');

router.route('/').post(createPost);
router.route('/:post_id')
      .get(getPost)
      .put(updatePost)
      .delete(removePost);

module.exports = router;