const dummy = (blogs) => {
	console.log(blogs)
	return 1
}

const totalLikes = (blogs) => {
	const total = blogs.reduce((sum,blog) => {
		return sum + blog.likes
	},0)
	return total
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}
	const maxBlog = blogs.reduce((maxi, blog) =>
		blog.likes > maxi.likes ? blog : maxi
	)
	var retu = {
		title:  maxBlog.title,
		author: maxBlog.author,
		likes: maxBlog.likes
	}
	return retu
}

module.exports = {
	dummy,totalLikes,favoriteBlog,
}


