const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
/*4.15 create new users by doing an HTTP POST request to address api/users. Users have a username, password and name.*/
usersRouter.get('/',async(request,response) => {
	const users = await User.find({}).populate('blogs',{ url: 1, title: 1, author: 1, id: 1 })
	response.status(200).json(users)
})
usersRouter.post('/',async(request,response) => {
	const { username,name,password }= request.body
	/*4.16 feature which adds the following restrictions to creating new users: Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique. The operation must respond with a suitable status code and some kind of an error message if an invalid user is created. Also, implement tests that ensure invalid users are not created and that an invalid add user operation returns a suitable status code and error message.*/
	if(username.length<=2){
		response.status(400).json({ error: 'The username must be atleast 3 characters long' })
	}
	if(password.length<=2){
		response.status(400).json({ error: 'The password must be atleast 3 characters long' })
	}
	const saltRounds =  10
	const passwordHash = await bcrypt.hash(password,saltRounds)
	const user = new User({
		username,name,passwordHash
	})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})
module.exports = usersRouter