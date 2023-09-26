const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//get all from DB
blogsRouter.get('/', async (request, response) => {
	/*4.17 listing all blogs so that the creator's user information is displayed with the blog and listing all users also displays the blogs created by each user*/
	const blogs = await Blog.find({}).populate('user',{ username:1,name:1,id: 1 })
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
	const users = await User.find({})
	const length = users.length
	const random = Math.floor(Math.random() * (length - 0) + 0)
	console.log(random)
	blog.user = users[random]._id
	const user = users[random]
	blog.likes = request.body.likes || 0
	if (blog.title===undefined||blog.author===undefined||blog.url===undefined) {
		return response.status(400).json({ error: 'content missing', })
	}
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
	user.blogs = user.blogs.concat(blog._id)
	await user.save()
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