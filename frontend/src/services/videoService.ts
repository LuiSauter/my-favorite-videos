import { config } from '../config/config'
import { Video } from '../interfaces/interfaces'

export const getVideos = async () => {
  const res = await fetch(`${config.URL_API}/api/videos`)
  const data = await res.json()
  return data
}

export const createVideo = async (video: Video) => {
  if (!video) return
  const res = await fetch(`${config.URL_API}/api/videos`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(video)
  })
  const data = await res.json()
  return data
}

export const getVideo = async (id: string) => {
  if (!id) return
  const video = await fetch(`${config.URL_API}/api/videos/${id}`, {
    method: 'GET',
  })
  const data = await video.json()
  return data
}

export const updateVideo = async (id: string, video: Video) => {
  if (!id) return
  const res = await fetch(`${config.URL_API}/api/videos/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(video)
  })
  const data = await res.json()
  return data
}

export const deleteVideo = async (id: string) => {
  if (!id) return
  return await fetch(`${config.URL_API}/api/videos/${id}`, {
    method: 'DELETE'
  })
}
