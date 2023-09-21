const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
//inital values
const initialBlogs = [
  {
    title: "MongoDB world",
    author: "MongoDB Team",
    url: "http://mongodbworld.com",
    likes: 500000,
    id: "648410f8925e64e969248c9f",
  },
  {
    title: "MongoDB friends",
    author: "MongoDB friends team",
    url: "http://mongodbfriends.com",
    likes: 456677,
    id: "649285ec5465feade00c05ab",
  },
  {
    title: "MongoDB friends",
    author: "MongoDB friends team",
    url: "http://mongodbfriends.com",
    likes: 456677,
    id: "65085725168f9b93d80a925c",
  },
]
beforeEach(async()=>{
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[2]);
    await blogObject.save();
},100000)
test ('api returns json',
    async() =>{
        await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
},100000)
test('api returns 3 blogs',
    async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
},100000)
test('api returns 0th blog as MongoDB world',
    async()=>{
        const response = await api.get('/api/blogs')
        expect(response.body[0].title).toBe('MongoDB world')
},100000)
test('all notes are returned',async()=>{
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
},100000)
test('a specific note is within the returned notes',async()=>{
  const response = await api.get('/api/blogs')
  const titles  = response.body.map(r => r.title)
  expect(titles).toContain("MongoDB world");
})
afterAll(async()=>{
    await mongoose.connection.close();
})
