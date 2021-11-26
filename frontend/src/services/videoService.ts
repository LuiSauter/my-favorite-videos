import { config } from '../config/config'
import { Video } from '../interfaces/interfaces'

export const getVideos = async (): Promise<Video[]> => {
  const res = await fetch(config.URL_API)
  const data = await res.json()
  return data
}

export const createVideo = async (video: Video): Promise<Video> => {
  const res = await fetch(config.URL_API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(video)
  })
  const data = await res.json()
  return data
}

export const updateVideo = async (id: string, video: Video): Promise<Video | null>=> {
  if (!id) return null
  const res = await fetch(`${config.URL_API}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(video)
  })
  const data = await res.json()
  return data
}

export const deleteVideo = async (id: string): Promise<null> => {
  await fetch(`${config.URL_API}/${id}`, {
    method: 'DELETE'
  })
  return null
}
