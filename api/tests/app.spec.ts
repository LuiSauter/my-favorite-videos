import mongoose from 'mongoose'
import request from 'supertest'
import { server } from '../src'
import app from '../src/app'

const api = request(app)

jest.useFakeTimers('legacy')

describe('GET /api/videos', () => {
  beforeEach((): void => {
    jest.useFakeTimers('legacy')
  })

  test('should respond with a status code 200', async () => {
    await api
      .get('/api/videos')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are videos', async () => {
    const response = await api.get('/api/videos')
    expect(response.body).toHaveLength(0)
  })

  afterAll(() => {
    mongoose.connection.close()
    mongoose.disconnect()
    server.close()
  })
})

// describe('POST /api/videos', () => {
//   describe('given a title and description', () => {
//     const newTask = {
//       title: 'test task',
//       url: 'https://www.youtube.com/watch?v=D0KrWq0i1QI&list=RDMM&index=1'
//     }

//     test('should respond with a 200 status code', async () => {
//       const response = await request(app).post('/api/videos').send(newTask)
//       expect(response.statusCode).toBe(200)
//     })

//     test('should have a content type: application/json in header', async () => {
//       const response = await request(app).post('/api/videos').send(newTask)
//       expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
//     })

//     test('should respond with an task ID', async () => {
//       const response = await request(app).post('/api/videos').send(newTask)
//       expect(response.body.id).toBeDefined()
//     })
//   })

//   describe('when title and description in missing', () => {
//     test('should respond with a 400 status code', async () => {
//       const fields = [
//         {},
//         { title: 'test videos'},
//         { url : 'http://example.com'}
//       ]
//       for (const body of fields) {
//         const response = await request(app).post('/api/videos').send(body)
//         expect(response.statusCode).toBe(400)
//       }
//     })
//   })
//   afterAll(() => {
//     mongoose.connection.close()
//     mongoose.disconnect()
//     server.close()
//   })
// })
