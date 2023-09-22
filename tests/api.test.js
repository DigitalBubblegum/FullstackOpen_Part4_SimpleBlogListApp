const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
beforeEach(async()=>{
    await Blog.deleteMany({});
    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
    blogObject = new Blog(helper.initialBlogs[2]);
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

  expect(response.body).toHaveLength(helper.initialBlogs.length)
},100000)
test('a specific note is within the returned notes',async()=>{
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type',/application\/json/)
  expect(resultBlog.body).toEqual(blogToView)
})
//Test to see if a valid blog can be added to the DB via GET
test('a valid blog can be added', async()=>{
  const newBlog = {
    title: "Learners Planet",
    author: "Anonymous",
    url: "http://learners-planet.com",
    likes: 5000,
  }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type',/application\/json/)


  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(r=>r.title)
  expect(titles).toContain('Learners Planet')
})

//test to see if an invalid blog cannot be added to the DB via GET
test('blog without content is not added',async()=>{
  const newBlog = {
    likes: 500000,
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
},100000)
afterAll(async()=>{
    await mongoose.connection.close();
})
