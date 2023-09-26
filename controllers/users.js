const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
/*4.15 create new users by doing an HTTP POST request to address api/users. Users have a username, password and name.*/
usersRouter.get('/',async(request,response) => {
	const users = await User.find({}).populate('blogs')
	response.json(users)
})
usersRouter.post('/',async(request,response) => {
	const { username,name,password }= request.body
	const saltRounds =  10
	const passwordHash = await bcrypt.hash(password,saltRounds)
	const user = new User({
		username,name,passwordHash
	})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})
module.exports = usersRouter