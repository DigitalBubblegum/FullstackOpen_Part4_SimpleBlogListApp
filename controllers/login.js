const jwt = require('jsonwebtoken')
const brcypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
//4.18 implemented token-based authentication
loginRouter.post('/',async(request,response) => {
	const { username,password } = request.body
	const user = await User.findOne({ username })
	const passwordCorrect = user === null ? false : await brcypt.compare(password,user.passwordHash)
	if(!(user && passwordCorrect)){
		return response.status(401).json({ error: 'invalid username or password' })
	}
	const userForToken = {
		user: user.username,
		id: user._id
	}
	const token = jwt.sign(userForToken,process.env.SECRET,{ expiresIn: 60*60 })
	response.status(200).send({ token,username:user.username,name:user.name,id: user.id })
})
module.exports = loginRouter