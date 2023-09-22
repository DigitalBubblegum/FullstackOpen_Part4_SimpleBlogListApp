const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
beforeEach(async()=>{
    await Blog.deleteMany({});
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
},100000)
//4.8 
test ('api returns json',
    async() =>{
      
        await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
},100000)
//4.9
test('verifies that the unique identifier property of the blog posts is named id', async() =>{
    response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
//4.10 Test to see if a valid blog can be added to the DB via GET
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
//4.11 Verify when likes is missing from the request, it will default to the value 0.
test('Verify when likes is missing from the request, it will default to the value 0.', async() =>{
  await api
    .post("/api/blogs")
    .send(helper.missingLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).toContain("Mongo Monkey");
})
//4.12 test to see if an invalid blog cannot be added to the DB via GET
test('blog without content is not added',async()=>{
  const newBlog = {
    likes: 500000,
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
},100000)
//4.13 test to see if a particular blog can be deleted
test('a particular blog can be deleted',async()=>{
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
  const titles = blogsAtEnd.map((r) => r.title);
  expect(titles).not.toContain(blogToDelete.title);
})
afterAll(async()=>{
    await mongoose.connection.close();
})
