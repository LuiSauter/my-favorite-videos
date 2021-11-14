import { createContext } from 'react'
import { VideoState } from '../../interfaces/interfaces'
// import { Dispatch, State } from './VideoReducer'

// const VideoContext = createContext<
//   { state: State; dispatch: Dispatch;} | undefined
// >(undefined)

export type ViodeContextProps = {
  videoState: VideoState
  deleteVideo: (id: string) => void
}

export const VideoContext = createContext<ViodeContextProps>({} as ViodeContextProps)



