import { VideoState, Video } from '../../interfaces/interfaces'

type Action =
  | {type: '@add-video', payload: Video }
  | {type: '@add-video-order', payload: Video }
  | {type: '@delete-video', payload: {id: string} }
  | {type: '@update-video', payload: Video }
  | {type: '@loading', payload: boolean }

export type Dispatch = (action: Action) => void

export const VideoReducer = (state: VideoState, action: Action): VideoState => {
  const {type} = action
  switch (type) {
  case '@add-video':
    return {
      ...state,
      videos: [action.payload, ...state.videos],
    }
  case '@add-video-order':
    return {
      ...state,
      videos: [...state.videos, action.payload],
    }
  case '@delete-video':
    return {
      ...state,
      videos: state.videos.filter((video) => video._id !== action.payload.id)
    }
  case '@update-video': {
    const updateVideo = action.payload
    const uptadetedVideo = state.videos.map((video) => {
      if (video._id === updateVideo._id) {
        video.title = updateVideo.title
        video.description = updateVideo.description
        video.url = updateVideo.url
        return video
      }
      return video
    })
    return {
      ...state,
      videos: uptadetedVideo
    }
  }
  case '@loading': {
    return {
      ...state,
      loading: action.payload
    }
  }
  default:
    return state
  }
}