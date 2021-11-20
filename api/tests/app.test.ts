import mongoose from 'mongoose'
import { server } from '../src'
import Video from '../src/models/video'
import User from '../src/models/user'
import { api, getAllContentFromVideos, initialVideos, initialUsers } from '../src/helpersTest/helpers'

jest.useFakeTimers('legacy')

beforeEach(async () => {
  await Video.deleteMany({})
  await User.deleteMany({})
  /**
  * const videosObject = initialVideos.map(video => new Video(video))
  * const promises = videosObject.map(video => video.save())
  * Promise.all(promises)
  */
  // best controll or correct use
  for(const video of initialVideos) {
    const videoObject = new Video(video)
    await videoObject.save()
  }
  for(const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

describe('GET /api/videos', () => {
  test('should respond with a status code 200', async () => {
    await api
      .get('/api/videos')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are videos', async () => {
    const {response} = await getAllContentFromVideos()
    expect(response.body).toHaveLength(initialVideos.length)
  })

  test('the first video is about:...', async () => {
    const {contents} = await getAllContentFromVideos()
    expect(contents).toContain('Testing for videos')
  })

})

describe('POST /api/videos', () => {
  describe('given a title and description', () => {
    const newVideo = {
      title: 'test video',
      url: 'https://www.youtube.com/watch?v=D0KrWq0i1QI&list=RDMM&index=1'
    }
    test('a valid video can be added', async () => {
      await api
        .post('/api/videos')
        .send(newVideo)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const {contents, response} = await getAllContentFromVideos()
      expect(response.body).toHaveLength(initialVideos.length + 1)
      expect(contents).toContain(newVideo.title)
    })
    test('should have a content type: application/json in header', async () => {
      const response = await api.post('/api/videos').send(newVideo)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test('should respond with an task ID', async () => {
      const response = await api.post('/api/videos').send(newVideo)
      expect(response.body._id).toBeDefined()
    })
  })

  describe('when title and description in missing', () => {
    test('should respond with a 400 status code', async () => {
      const fields = [
        {},
        { title: 'test videos'},
        { url : 'http://example.com'}
      ]
      for (const body of fields) {
        await api
          .post('/api/videos')
          .send(body)
          .expect(400)
        const {response} = await getAllContentFromVideos()
        expect(response.body).toHaveLength(initialVideos.length)
      }
    })
  })
})

describe('DELETE /api/videos/:id', () => {
  test('a video can be not deleted', async () => {
    await api
      .delete('/api/videos/123124')
      .expect(400)
    const {response} = await getAllContentFromVideos()
    expect(response.body).toHaveLength(initialVideos.length)
  })
  test('a video can be deleted!', async () => {
    const {response: firstResponse} = await getAllContentFromVideos()
    const {body} = firstResponse
    await api
      .delete(`/api/videos/${body[0]._id}`)
      .expect(200)
    const {response} = await getAllContentFromVideos()
    expect(response.body).toHaveLength(initialVideos.length - 1)
  })
})

describe('UPDATE /api/videos/:id', () => {
  const videoUpdated = {
    title: 'video 1 updated successfully',
    url: 'https://youtu.be/AH13izmP4fM?list=RDD0KrWq0i1QI',
    description: 'video description updated'
  }
  test('a video can be not updated', async () => {
    await api
      .put('/api/videos/123456')
      .send(videoUpdated)
      .expect(400)
    const {response} = await getAllContentFromVideos()
    expect(response.body).toHaveLength(initialVideos.length)
  })
  test('a video can be updated', async () => {
    const {response: firstResponse} = await getAllContentFromVideos()
    const {body} = firstResponse
    await api
      .put(`/api/videos/${body[0]._id}`)
      .send(videoUpdated)
      .expect(200)
    const {contents} = await getAllContentFromVideos()
    expect(contents).toContain('video 1 updated successfully')
  })
})

describe('GET /api/videos/:id', () => {
  test('there should not be a video with that invalid id', async () => {
    await api
      .get('/api/videos/123456')
      .expect(400)
  })
  test('should respond with a status code 200', async () => {
    const {response} = await getAllContentFromVideos()
    const {_id} = response.body[0]
    await api
      .get(`/api/videos/${_id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST /user/signup && /user/signin', () => {
  const newUser = {
    email: 'gabriel@gmail.com',
    password: 'gabrieldev'
  }
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
        password: 'sauterdev'
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
})

// afterEach(() => mongoose.disconnect())
afterAll(async () => {
  await mongoose.connection.close(true)
  await mongoose.disconnect()
  server.close()
})