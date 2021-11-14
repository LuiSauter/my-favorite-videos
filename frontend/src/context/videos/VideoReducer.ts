// import { GET_VIDEOS } from '../types'
import { VideoState, Video } from '../../interfaces/interfaces'

type Action =
  | {type: '@add-video', payload: Video }
  | {type: '@delete-video', payload: {id: string} }

export type Dispatch = (action: Action) => void

export const VideoReducer = (state: VideoState, action: Action): VideoState => {
  const {type} = action
  switch (type) {
  case '@add-video':
    return {
      ...state,
      videos: [action.payload, ...state.videos],
    }
  case '@delete-video':
    return {
      ...state,
      videos: state.videos.filter((video) => video._id !== action.payload.id)
    }
  default:
    return state
  }
}