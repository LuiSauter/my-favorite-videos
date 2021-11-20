import mongoose from 'mongoose'
import { server } from '../src'
import Video from '../src/models/video'
import { api, getAllContentFromVideos, initialVideos } from '../src/helpersTest/helpers'

jest.useFakeTimers('legacy')

beforeEach(async () => {
  await Video.deleteMany({})
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

describe('DELETE /api/videos', () => {
  test('a video can be deleted', async () => {
    // const {response: firstResponse} = await getAllContentFromVideos()
    // const {body: videos} = firstResponse
    // const videoToDelete = videos[0]
    await api
      .delete('/api/videos/123124')
      .expect(400)
    const {response: secondResponse} = await getAllContentFromVideos()
    expect(secondResponse.body).toHaveLength(initialVideos.length)

    // expect(contents).not.toContain(videoToDelete.content)
  })

})

// afterEach(() => mongoose.disconnect())
afterAll(async () => {
  await mongoose.connection.close(true)
  await mongoose.disconnect()
  server.close()
})