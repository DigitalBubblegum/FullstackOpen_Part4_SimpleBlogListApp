const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (blog.title===undefined||blog.author===undefined||blog.url===undefined||blog.likes===undefined) {
    return response.status(400).json({error: "content missing",});
  }
    try{
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }catch(exception){
      next(exception)
    }
});
module.exports = blogsRouter;