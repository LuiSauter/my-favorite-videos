import { createContext } from 'react'
import { Video, VideoState } from '../../interfaces/interfaces'

export type VideoContextProps = {
  videoState: VideoState
  deleteVideo: (id: string) => void
  updateVideo: (id: string, video: Video) => void
  addVideo: (video: Video) => void
  loading: boolean
}

export const VideoContext = createContext<VideoContextProps>({} as VideoContextProps)



