const blogsRouter = require('express').Router()
const { response } = require('../app');
const Blog = require('../models/blog')
//get all from DB
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});
//get by ID
blogsRouter.get('/:id',async(request,response)=>{
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
//post to DB
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  blog.likes = request.body.likes || 0
  if (blog.title===undefined||blog.author===undefined||blog.url===undefined) {
    return response.status(400).json({error: "content missing",});
  }
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
});
//Delete from DB
blogsRouter.delete('/:id',async(request,response)=>{
  
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})
module.exports = blogsRouter;