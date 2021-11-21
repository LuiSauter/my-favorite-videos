import { api, initialUsers } from '../helpersTest/helpers'
import User from '../models/user'
import mongoose from 'mongoose'
import { server } from '..'
import { send } from 'process'

beforeEach(async () => {
  await User.deleteMany({})
  for(const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

describe('POST /user/signup && /user/signin', () => {
  const newUser = {
    email: 'gabriel@gmail.com',
    password: 'gabrieldev',
  }
  test('login fails with proper status code and message if username is not yet registered', async () => {
    const response = await api
      .post('/user/signin')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.msg).toContain('The user does not exist')
  })
  test('given a eamil and password', async () => {
    await api
      .post('/user/signup')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/user/all').send()
    expect(response.body).toHaveLength(initialUsers.length + 1)
  })
  test('should respond 200 status code when user log in', async () => {
    await api
      .post('/user/signin')
      .send({
        email: 'sauter@gmail.com',
        password: 'sauterdev',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('should respond with a status code 200', async () => {
    await api
      .get('/user/all')
      .send()
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  afterAll(async () => {
    await mongoose.connection.close(true)
    await mongoose.disconnect()
    server.close()
  })
})
