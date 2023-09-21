const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "MongoDB world",
    author: "MongoDB Team",
    url: "http://mongodbworld.com",
    likes: 500000,
  },
  {
    title: "MongoDB friends",
    author: "MongoDB friends team",
    url: "http://mongodbfriends.com",
    likes: 456677,
  },
  {
    title: "MongoDB friends",
    author: "MongoDB friends team",
    url: "http://mongodbfriends.com",
    likes: 456677,
  },
]


//TODO non existing ID

//

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
//   nonExistingId,
  blogsInDb,
};