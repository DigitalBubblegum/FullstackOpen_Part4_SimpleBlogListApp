const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  if (blog.title===undefined||blog.author===undefined||blog.url===undefined||blog.likes===undefined) {
    return response.status(400).json({error: "content missing",});
  }
    blog.save().then((result) => {
      response.status(201).json(result);
    });
});
module.exports = blogsRouter;