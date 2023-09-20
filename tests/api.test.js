const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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
afterAll(async()=>{
    await mongoose.connection.close();
})
