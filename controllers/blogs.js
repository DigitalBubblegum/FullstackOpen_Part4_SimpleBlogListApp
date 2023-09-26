const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//get all from DB
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})
//get by ID
blogsRouter.get('/:id',async(request,response) => {
	const blog = await Blog.findById(request.params.id)
	if(blog){
		response.json(blog)
	} else {
		response.status(404).end()
	}
})
//post to DB
blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	blog.likes = request.body.likes || 0
	if (blog.title===undefined||blog.author===undefined||blog.url===undefined) {
		return response.status(400).json({ error: 'content missing', })
	}
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})
//Update in DB
blogsRouter.put('/:id', (request,response) => {
	const body = request.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes||0,
	}
	//  Blog.findByIdAndUpdate(request.5params.id, blog, { new: true })
	// response.status(200).end()
	Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(
		(updatedBlog) => {
			response.json(updatedBlog).status(200)
		}
	)
})
//Delete from DB
blogsRouter.delete('/:id',async(request,response) => {

	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})
module.exports = blogsRouter