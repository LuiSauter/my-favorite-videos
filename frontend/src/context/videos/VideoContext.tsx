import { createContext } from 'react'
import { Video, VideoState } from '../../interfaces/interfaces'

export type ViodeContextProps = {
  videoState: VideoState
  deleteVideo: (id: string) => void
  updateVideo: (id: string, video: Video) => void
  addVideo: (video: Video) => void
}

export const VideoContext = createContext<ViodeContextProps>({} as ViodeContextProps)



