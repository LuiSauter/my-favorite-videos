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

export const VideoStateProvider = ({children}: Props): JSX.Element=> {

  const [videoState, dispatch] = useReducer(VideoReducer, initalState)

  useEffect(() => {
    if (videoState.videos.length === 0) {
      videoService.getVideos().then((data)=> {
        data.map((videos:Video) => {
          dispatch({ type: '@add-video-order', payload: videos})
        })
      })
    }
  }, [videoState.videos.length])

  const addVideo = async (video:Video) => {
    const newVideo = await videoService.createVideo(video)
    dispatch({ type: '@add-video', payload: newVideo})
  }

  const deleteVideo = async (id:string) => {
    await videoService.deleteVideo(id)
    dispatch({type: '@delete-video', payload: {id}})
  }

  const updateVideo = async (id: string, video: Video) => {
    await videoService.updateVideo(id, video)
    dispatch({type: '@update-video', payload: video})
  }

  return (
    <VideoContext.Provider value={{ videoState, deleteVideo, updateVideo, addVideo }}>
      {children}
    </VideoContext.Provider>
  )
}