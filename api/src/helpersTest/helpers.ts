import request from 'supertest'
import app from '../app'
import { IVideo } from '../Interfaces/IVideo'
export const api = request(app)

export const initialVideos = [
  {
    title: 'Testing for videos',
    url: 'https://www.youtube.com/watch?v=p0OH206z9Wg',
    description: 'This is a video for test'
  },
  {
    title: 'Testing for videos 2',
    url: 'https://www.youtube.com/watch?v=8DowcVNF0Lk',
    description: 'This is a video for test 2'
  }
]

export const getAllContentFromVideos = async ()  => {
  const response = await api.get('/api/videos').send()
  return {
    response,
    contents: response.body.map((video: IVideo) => video.title)
  }
}