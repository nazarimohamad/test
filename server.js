require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000;


const db = require('./models');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const { logginRequired, ensureCurrentUser } = require('./middlewares/auth');


app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/posts', logginRequired, ensureCurrentUser, postsRoutes);

// get all posts
app.get('/api/posts', async function(req, res, next) {
  try {
    let posts = await db.Post.find();
    return res.status(200).json(posts)
  }
  catch (err) {
    return next(err)
  }
})

// search between posts according to their name
app.get('/api/find/:query', async function(req, res, next){
  try {
    let query = req.params.query;
    await db.Post.find({
      "name": query
    }, function(err, result){
      if(err){
        return next(err)
      }
      return res.status(200).json(result)
    })
  } catch (err) {
    return next(err)
  }
})



// get error and handle it
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);


// app.use(express.static(path.join(__dirname, 'client/build')));
// if(process.env.NODE_ENV === 'production') {
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//   })
// }


app.listen(PORT, function(){
  console.log(`Server is running on port ${PORT}`)
})