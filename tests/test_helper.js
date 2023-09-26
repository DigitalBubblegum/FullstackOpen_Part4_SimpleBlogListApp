const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
	{
		title: 'MongoDB world',
		author: 'MongoDB Team',
		url: 'http://mongodbworld.com',
		likes: 500000,
	},
	{
		title: 'MongoDB friends',
		author: 'MongoDB friends team',
		url: 'http://mongodbfriends.com',
		likes: 456677,
	},
]

const missingLikes = {
	title: 'Mongo Monkey',
	author: 'Mongo Monkey Team',
	url: 'http://mongomonkey.com',
}

//TODO non existing ID

//

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON)
}

module.exports = {
	initialBlogs,
	//   nonExistingId,
	missingLikes,
	blogsInDb,
	usersInDb,
}