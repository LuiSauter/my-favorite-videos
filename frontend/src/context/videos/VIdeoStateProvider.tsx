import React, { useEffect, useReducer } from 'react'
import { Video, VideoState } from '../../interfaces/interfaces'
import * as videoService from '../../services/videoService'
import { VideoContext } from './VideoContext'
import { VideoReducer } from './VideoReducer'

export const initalState: VideoState = {
  videos: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const VideoStateProvider = ({children}: Props) => {

  const [videoState, dispatch] = useReducer(VideoReducer, initalState)

  useEffect(() => {
    if (videoState.videos.length === 0) {
      videoService.getVideos().then((data)=> {
        data.map((videos:Video) => {
          dispatch({ type: '@add-video', payload: videos})
        })
      })
    }
  }, [videoState.videos.length])

  const deleteVideo = async (id:string) => {
    await videoService.deleteVideo(id)
    dispatch({type: '@delete-video', payload: {id}})
  }

  return (
    <VideoContext.Provider value={{ videoState, deleteVideo }}>
      {children}
    </VideoContext.Provider>
  )
}