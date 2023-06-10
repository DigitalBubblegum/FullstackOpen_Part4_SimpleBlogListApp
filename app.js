const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
console.log("connecting to ", process.env.MONGODB_URI);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

  // const blog = new Blog({
  //   title: 'MongoDB world',
  //   author: 'MongoDB Team',
  //   url: 'http://mongodbworld.com',
  //   likes: 500000,
  // });
  // blog.save().then((result) => {
  //   console.log("note saved!");
  //   mongoose.connection.close();
  // });
app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
module.exports = app